import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const HomeView = () => import('../views/HomeView.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const CartView = () => import('../views/CartView.vue')
const CheckoutView = () => import('../views/CheckoutView.vue')
const OrderConfirmation = () => import('../views/OrderConfirmation.vue')
const AdminLogin = () => import('../views/admin/AdminLogin.vue')
const AdminProducts = () => import('../views/admin/ProductsView.vue')
const AdminProductForm = () => import('../views/admin/ProductForm.vue')
const AboutView = () => import('../views/AboutView.vue')
const ContactView = () => import('../views/ContactView.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        props: true
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartView
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: CheckoutView
    },
    {
        path: '/order-confirmation/:id',
        name: 'OrderConfirmation',
        component: OrderConfirmation,
        props: true
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/product/new',
        name: 'NewProduct',
        component: AdminProductForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/product/edit/:id',
        name: 'EditProduct',
        component: AdminProductForm,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for admin routes
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    // Initialize auth state
    authStore.initAuth()
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'AdminLogin' })
    } else if (to.name === 'AdminLogin' && authStore.isAuthenticated) {
        // If already logged in, redirect to admin dashboard
        next({ name: 'AdminProducts' })
    } else {
        next()
    }
})

export default router