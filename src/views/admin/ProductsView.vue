<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Product Management</h1>
      <router-link
          to="/admin/product/new"
          class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Add New Product
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Filters -->
      <div class="p-6 border-b">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                @input="debouncedSearch"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" @change="fetchProducts">
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select v-model="sortBy" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
              <option value="created_at">Date Added</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>

      <!-- Products Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
          <tr>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Product</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Price</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Stock</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Created</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.product_id" class="hover:bg-gray-50 transition-colors">
            <td class="py-4 px-6">
              <span class="font-mono text-gray-500">#{{ product.product_id }}</span>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <img
                    :src="product.image_url || 'https://via.placeholder.com/60x60'"
                    :alt="product.name"
                    class="w-12 h-12 object-cover rounded mr-4"
                    @error="handleImageError"
                >
                <div>
                  <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                  <p class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="font-medium">${{ product.price }}</span>
            </td>
            <td class="py-4 px-6">
                <span :class="[
                  product.stock === 0
                    ? 'text-red-600 font-bold bg-red-50 px-2 py-1 rounded'
                    : product.stock < 10
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-900'
                ]">
                  {{ product.stock }}
                </span>
            </td>
            <td class="py-4 px-6">
                <span
                    :class="[
                    'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                    product.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  ]"
                >
                  {{ product.status }}
                </span>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm text-gray-500">{{ formatDate(product.created_at,{preset: 'short'}) }}</span>
            </td>
            <td class="py-4 px-6">
              <div class="flex space-x-2">
                <router-link
                    :to="`/admin/product/edit/${product.product_id}`"
                    class="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors"
                    title="Edit"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </router-link>
                <button
                    @click="showDeleteConfirmation(product)"
                    class="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                    title="Delete"
                    :disabled="deletingProductId === product.product_id"
                >
                  <svg v-if="deletingProductId === product.product_id" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-500 mb-4">{{ searchQuery || statusFilter ? 'Try adjusting your search or filters' : 'Get started by creating a new product.' }}</p>
        <router-link
            v-if="searchQuery || statusFilter"
            to="/admin/products"
            class="text-blue-600 hover:text-blue-800 font-medium"
            @click="clearFilters"
        >
          Clear filters
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="filteredProducts.length > 0" class="p-6 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ filteredProducts.length }}</span> of <span class="font-medium">{{ totalProducts }}</span> products
          </div>
          <div class="flex space-x-2">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span class="px-3 py-1">{{ currentPage }}</span>
            <button
                @click="nextPage"
                :disabled="filteredProducts.length < itemsPerPage"
                class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Dialog -->
    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all" :class="dialogAnimation">
        <div class="p-6">
          <!-- Warning Icon -->
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">
            Delete Product
          </h3>

          <!-- Message -->
          <p class="text-gray-600 text-center mb-6">
            Are you sure you want to delete <strong>"{{ selectedProduct?.name }}"</strong>?
            <span v-if="selectedProduct?.stock > 0" class="block text-red-600 text-sm mt-2">
              ⚠️ Warning: This product has {{ selectedProduct.stock }} items in stock.
            </span>
            <span class="block text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </span>
          </p>

          <!-- Actions -->
          <div class="flex space-x-3">
            <button
                @click="cancelDelete"
                :disabled="deletingProductId === selectedProduct?.product_id"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
                @click="confirmDelete"
                :disabled="deletingProductId === selectedProduct?.product_id"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <svg v-if="deletingProductId === selectedProduct?.product_id" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ deletingProductId === selectedProduct?.product_id ? 'Deleting...' : 'Delete Product' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {productService} from '@/services/api.ts';
import {AxiosError} from "axios";
import {formatDate} from "@/composables/useDateFormatter.ts";
import {useToast} from "@/composables/useToast.ts";

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  status: string;
  created_at: string;
}

// State
const products = ref<Product[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const statusFilter = ref('');
const sortBy = ref('created_at');
const currentPage = ref(1);
const itemsPerPage = ref(20);
const totalProducts = ref(0);

// Delete Dialog State
const showDeleteDialog = ref(false);
const selectedProduct = ref<Product | null>(null);
const deletingProductId = ref<number | null>(null);
const dialogAnimation = ref('scale-100');

const { toast } = useToast();

// Debounce for search
let searchTimeout: ReturnType<typeof setTimeout>;

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchProducts();
  }, 300);
};

// Computed
const filteredProducts = computed(() => {
  if (!Array.isArray(products.value) || products.value.length === 0) {
    return [];
  }

  let filtered = [...products.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.product_id.toString().includes(query)
    );
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(product => product.status === statusFilter.value);
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'id':
        return a.product_id - b.product_id;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // Pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filtered.slice(startIndex, endIndex);
});

// Lifecycle
onMounted(async () => {
  await fetchProducts();
});

// Methods
async function fetchProducts() {
  try {
    loading.value = true;
    products.value = await productService.getProducts({
      status: statusFilter.value,
      search: searchQuery.value
    });
    totalProducts.value = products.value.length;
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products. Please try again.');
  } finally {
    loading.value = false;
  }
}

function showDeleteConfirmation(product: Product) {
  selectedProduct.value = product;
  showDeleteDialog.value = true;
  dialogAnimation.value = 'scale-100';
}

function cancelDelete() {
  dialogAnimation.value = 'scale-95 opacity-0';
  setTimeout(() => {
    showDeleteDialog.value = false;
    selectedProduct.value = null;
  }, 200);
}

async function confirmDelete() {
  if (!selectedProduct.value) return;

  deletingProductId.value = selectedProduct.value.product_id;

  try {
    await productService.deleteProduct(selectedProduct.value.product_id);

    // Remove from local state
    const index = products.value.findIndex(p => p.product_id === selectedProduct.value!.product_id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }

    toast.success('Product deleted successfully');

  } catch (error) {
    console.error('Error deleting product:', error);
    const message = error instanceof AxiosError
        ? error.response?.data?.error || 'Failed to delete product'
        : 'Failed to delete product';
    toast.error(message)
  } finally {
    deletingProductId.value = null;
    cancelDelete();
  }
}

function clearFilters() {
  searchQuery.value = '';
  statusFilter.value = '';
  currentPage.value = 1;
  fetchProducts();
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (filteredProducts.value.length === itemsPerPage.value) {
    currentPage.value++;
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  const fallbackUrl = 'https://via.placeholder.com/60x60?text=No+Image';
  if (img.src !== fallbackUrl && !img.src.includes('placeholder.com')) {
    img.src = fallbackUrl;
    img.onerror = null;
  }
}

// Watchers
watch([statusFilter, sortBy], () => {
  currentPage.value = 1;
  fetchProducts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scale-100 {
  transform: scale(1);
}

.scale-95 {
  transform: scale(0.95);
}

.opacity-0 {
  opacity: 0;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>