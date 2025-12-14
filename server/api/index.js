const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');
const fs = require("node:fs");
const {diskStorage} = require("multer");
const multer = require("multer");
const {join} = require("node:path");
const path = require("node:path");
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection
let pool = null;

const getPool = () => {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            max: 1, // Important for serverless - use 1 connection
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000
        });
    }
    return pool;
};

// Configure Multer for file uploads
const uploadDir = join(__dirname, "../",process.env.PRODUCT_IMAGE_PATH); // product path

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 Created upload directory:', uploadDir);
}

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
        }
    }
});

app.use('/uploads', express.static(join(__dirname, '../uploads')));

app.get('/api/products', async (req, res) => {
    try {
        const { status, search } = req.query;
        const pool = getPool();

        // Build WHERE conditions dynamically
        const conditions = [];
        const params = [];
        let paramIndex = 1;

        // Status filter
        if (status && status.toLowerCase() !== 'all') {
            conditions.push(`status = $${paramIndex}`);
            params.push(status.toUpperCase());
            paramIndex++;
        }

        // Search by name or description
        if (search) {
            conditions.push(`(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`);
            params.push(`%${search}%`);
            paramIndex++;
        }

        // Build the SQL query
        let whereClause = '';
        if (conditions.length > 0) {
            whereClause = `WHERE ${conditions.join(' AND ')}`;
        }

        const query = `
            SELECT * FROM products 
            ${whereClause}
            ORDER BY product_id
        `;

        const result = await pool.query(query, params);

        result.rows.forEach(row => {
            if (row.image_url) {
                if (!row.image_url.startsWith('http')) {
                    row.image_url = `${process.env.BASE_URL}/${process.env.PRODUCT_IMAGE_PATH}/${row.image_url}`;
                }
            }
        });

        res.json(result.rows);

    } catch (err) {
        console.error('❌ Error fetching products:', err);
        res.status(500).json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = result.rows[0];
        if (product.image_url && !product.image_url.startsWith('http')) {
            product.image_url = `${process.env.BASE_URL}/${process.env.PRODUCT_IMAGE_PATH}/${product.image_url}`;
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// For Vercel: Remove multer uploads - use cloud storage instead
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, stock, status } = req.body;

        if (!name || !price || stock === undefined) {
            return res.status(400).json({ error: 'Missing required fields: name, price, stock' });
        }

        let imagePath = '';
        if (req.file) {
            // Store relative path
            imagePath = req.file.filename;
        }

        const pool = getPool();
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, image_url, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, parseFloat(price), parseInt(stock), imagePath, status || 'ACTIVE']
        );

        result.rows[0].image_url = `${process.env.BASE_URL}/${process.env.PRODUCT_IMAGE_PATH}/${result.rows[0].image_url}`;
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('❌ Error creating product:', err);

        if(req.file){
            const imagePath = join(__dirname, process.env.PRODUCT_IMAGE_PATH, req.file.filename);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }

        res.status(500).json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const pool = getPool();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { id } = req.params;
        const { name, description, price, stock, status } = req.body;

        if (!name || !price || stock === undefined) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Missing required fields: name, price, stock' });
        }

        const exitImage = await client.query(
            'SELECT image_url FROM products WHERE product_id = $1',
            [id]
        );

        let imagePath = '';
        if(req.file){
            imagePath = join(__dirname, process.env.PRODUCT_IMAGE_PATH, exitImage.rows[0].image_url);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
            imagePath = req.file.filename;
        }

        const result = await client.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, status = $6 WHERE product_id = $7 RETURNING *',
            [name, description, parseFloat(price), parseInt(stock), imagePath, status || 'ACTIVE', id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Product not found' });
        }

        await client.query('COMMIT');

        result.rows[0].image_url = `${process.env.BASE_URL}/${process.env.PRODUCT_IMAGE_PATH}/${result.rows[0].image_url}`;
        res.json(result.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Error updating product:', err);

        if(req.file){
            const imagePath = join(__dirname, process.env.PRODUCT_IMAGE_PATH, req.file.filename);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }

        res.status(500).json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    } finally {
        client.release();
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const pool = getPool();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { id } = req.params;

        const orderItem = await client.query(
            'SELECT * FROM order_items WHERE product_id = $1',
            [id]
        );

        if (orderItem.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Product cannot be deleted as it is in an order' });
        }

        const result = await client.query(
            'DELETE FROM products WHERE product_id = $1 RETURNING product_id',
            [id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Product not found' });
        }

        await client.query('COMMIT');
        res.status(204).send();
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
});

// Orders API (unchanged, works on Vercel)
app.post('/api/orders', async (req, res) => {
    const pool = getPool();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const {
            customer_name,
            customer_email,
            customer_phone,
            shipping_address,
            items,
            total_amount
        } = req.body;

        if (!customer_name || !customer_email || !items || items.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                error: 'Missing required fields: customer_name, customer_email, and at least one item is required'
            });
        }

        for (const item of items) {
            if (!item.product_id || !item.quantity || item.quantity <= 0) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    error: 'Each item must have a valid product_id and quantity greater than 0'
                });
            }

            const productCheck = await client.query(
                `SELECT p.product_id, p.name, p.price, p.stock, p.status 
                 FROM products p 
                 WHERE p.product_id = $1 
                 FOR UPDATE`,
                [item.product_id]
            );

            if (productCheck.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({
                    error: `Product with ID ${item.product_id} not found`
                });
            }

            const product = productCheck.rows[0];

            if (product.status !== 'ACTIVE') {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    error: `Product "${product.name}" is not available for purchase`
                });
            }

            if (product.stock < item.quantity) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    error: `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }
        }

        const orderResult = await client.query(
            `INSERT INTO orders 
             (customer_name, customer_email, customer_phone, shipping_address, total_amount) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [customer_name, customer_email, customer_phone, shipping_address, total_amount]
        );

        const order = orderResult.rows[0];

        for (const item of items) {
            await client.query(
                `INSERT INTO order_items 
                 (order_id, product_id, quantity, unit_price, subtotal) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [order.order_id, item.product_id, item.quantity, item.price, item.subtotal]
            );

            await client.query(
                `UPDATE products 
                 SET stock = stock - $1 
                 WHERE product_id = $2`,
                [item.quantity, item.product_id]
            );
        }

        await client.query('COMMIT');
        res.status(201).json(order);

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Order creation error:', err);

        if (err.code === '23505') {
            res.status(400).json({ error: 'Duplicate order detected' });
        } else if (err.code === '23503') {
            res.status(400).json({ error: 'Invalid product reference' });
        } else if (err.code === '22003') {
            res.status(400).json({ error: 'Invalid numeric value' });
        } else {
            res.status(500).json({
                error: 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    } finally {
        client.release();
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        const completeOrder = await pool.query(
            `SELECT o.*, 
                    json_agg(
                        json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'unit_price', oi.unit_price,
                            'subtotal', oi.subtotal,
                            'product_name', p.name
                        )
                    ) as items
             FROM orders o
             LEFT JOIN order_items oi ON o.order_id = oi.order_id
             LEFT JOIN products p ON oi.product_id = p.product_id
             WHERE o.order_id = $1
             GROUP BY o.order_id`,
            [id]
        );

        if (completeOrder.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(completeOrder.rows[0]);
    } catch (e) {
        res.status(500).json({
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? e.message : undefined
        });
    }
});


module.exports = app;

// Local development only
if (process.env.NODE_ENV !== 'production' && require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running locally on http://localhost:${PORT}`);
    });
}