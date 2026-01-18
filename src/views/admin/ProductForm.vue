<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack" 
              class="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all transform hover:scale-110"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-3xl font-bold mb-2">
                {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
              </h1>
              <p class="text-blue-100">
                {{ isEditMode ? 'Update product information and details' : 'Create a new product for your store' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading && isEditMode" class="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-500"></div>
          <p class="text-lg text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>

      <!-- Product Form -->
      <form v-else @submit.prevent="submitForm" enctype="multipart/form-data" class="space-y-8">
        <!-- Image Upload Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div class="flex items-center">
              <div class="bg-blue-600 rounded-lg p-2 mr-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">Product Image</h2>
                <p class="text-sm text-gray-600">Upload a high-quality image for your product</p>
              </div>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Image Preview -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Image Preview</label>
                <div class="relative group">
                  <div class="aspect-square w-full rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 transition-all duration-300 group-hover:border-blue-400">
                    <div v-if="imagePreview || form.current_image_url" class="h-full">
                      <img
                        :src="imagePreview || form.current_image_url"
                        :alt="form.name || 'Product image'"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        @error="handleImageError"
                      >
                    </div>
                    <div v-else class="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div class="bg-gray-100 rounded-full p-6 mb-4">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p class="text-sm font-medium text-gray-500">No image selected</p>
                      <p class="text-xs text-gray-400 mt-1">Upload an image to preview</p>
                    </div>
                  </div>

                  <!-- Remove Image Button -->
                  <button
                    v-if="imagePreview || form.current_image_url"
                    type="button"
                    @click="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-110"
                    title="Remove image"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Upload Controls -->
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">Upload Image</label>
                  <label class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 group">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-12 h-12 mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="mb-2 text-sm font-semibold text-gray-700">
                        <span class="text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF, WebP (MAX. 5MB)</p>
                    </div>
                    <input
                      id="image"
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleImageUpload"
                    >
                  </label>
                </div>

                <!-- Current Image Info -->
                <div v-if="isEditMode && form.current_image_url && !form.image" class="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-blue-900">Current Image</p>
                      <p class="text-sm text-blue-700 mt-1">Your existing image will be kept unless you upload a new one.</p>
                    </div>
                  </div>
                </div>

                <!-- Selected File Info -->
                <div v-if="form.image" class="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <div class="flex-grow">
                      <div class="flex justify-between items-start mb-2">
                        <p class="text-sm font-semibold text-green-900 truncate">{{ form.image.name }}</p>
                        <span class="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold ml-2">
                          {{ formatFileSize(form.image.size) }}
                        </span>
                      </div>
                      <div class="w-full bg-green-200 rounded-full h-2 mb-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: 100%"></div>
                      </div>
                      <p class="text-xs text-green-700 font-medium">Ready to upload</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <div class="flex items-center">
              <div class="bg-indigo-600 rounded-lg p-2 mr-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900">Product Details</h2>
                <p class="text-sm text-gray-600">Enter product information and specifications</p>
              </div>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Product Name -->
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <input
                      v-model="form.name"
                      type="text"
                      id="name"
                      required
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g., Premium Wireless Headphones"
                    >
                  </div>
                  <p class="mt-2 text-xs text-gray-500">A clear and descriptive name for your product</p>
                </div>

                <!-- Description -->
                <div>
                  <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    v-model="form.description"
                    id="description"
                    rows="6"
                    class="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Describe your product in detail... Include features, benefits, and specifications."
                  ></textarea>
                  <p class="mt-2 text-xs text-gray-500">Provide detailed information about the product features and benefits</p>
                </div>
              </div>
              
              <!-- Right Column -->
              <div class="space-y-6">
                <!-- Price -->
                <div>
                  <label for="price" class="block text-sm font-semibold text-gray-700 mb-2">
                    Price <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span class="text-gray-500 font-semibold">$</span>
                    </div>
                    <input
                      v-model.number="form.price"
                      type="number"
                      id="price"
                      required
                      min="0"
                      step="0.01"
                      class="block w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                    >
                  </div>
                  <p class="mt-2 text-xs text-gray-500">Selling price per unit in USD</p>
                </div>

                <!-- Stock -->
                <div>
                  <label for="stock" class="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <input
                      v-model.number="form.stock"
                      type="number"
                      id="stock"
                      required
                      min="0"
                      class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0"
                    >
                  </div>
                  <p class="mt-2 text-xs text-gray-500">Number of items available in stock</p>
                </div>

                <!-- Status -->
                <div>
                  <label for="status" class="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="form.status"
                      id="status"
                      required
                      class="block w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                    >
                      <option value="ACTIVE">Active - Product is visible to customers</option>
                      <option value="INACTIVE">Inactive - Product is hidden from customers</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">Control product visibility on the store</p>
                </div>

                <!-- Info Box -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-blue-900">Tips for Best Results</p>
                      <ul class="mt-2 text-xs text-blue-700 space-y-1">
                        <li>• Use high-quality product images</li>
                        <li>• Write clear and detailed descriptions</li>
                        <li>• Set accurate pricing and stock levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="button"
              @click="goBack"
              class="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <div class="flex space-x-4 w-full sm:w-auto">
              <button
                v-if="isEditMode"
                type="button"
                @click="resetForm"
                class="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Reset
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ submitting ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product') }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '@/services/api';
import { useToast } from '@/composables/useToast';

const route = useRoute();
const router = useRouter();
const { toast } = useToast();

const isEditMode = computed(() => route.name === 'EditProduct');
const loading = ref(false);
const submitting = ref(false);
const imagePreview = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image: null as File | null,
  current_image_url: '',
  status: 'ACTIVE'
});

const defaultForm = { ...form };

onMounted(async () => {
  if (isEditMode.value) {
    await fetchProduct();
  }
});

async function fetchProduct() {
  try {
    loading.value = true;
    const productId = parseInt(route.params.id as string);
    const product = await productService.getProduct(productId);

    Object.assign(form, {
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      current_image_url: product.image_url || '',
      status: product.status
    });

    Object.assign(defaultForm, { ...form });
    imagePreview.value = form.current_image_url || '';
  } catch (error) {
    toast.error('Failed to load product');
    await router.push('/admin');
  } finally {
    loading.value = false;
  }
}

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      if (fileInput.value) fileInput.value.value = '';
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only image files are allowed (JPEG, PNG, GIF, WebP)');
      if (fileInput.value) fileInput.value.value = '';
      return;
    }

    form.image = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  form.image = null;
  form.current_image_url = '';
  imagePreview.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  const fallbackUrl = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
  if (img.src !== fallbackUrl && !img.src.includes('placeholder.com')) {
    img.src = fallbackUrl;
    img.onerror = null;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function resetForm() {
  Object.assign(form, { ...defaultForm });
  imagePreview.value = form.current_image_url || '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  toast.info('Form reset to original values');
}

function goBack() {
  router.push('/admin');
}

async function submitForm() {
  if (submitting.value) return;

  try {
    submitting.value = true;

    // Create FormData
    const formData = new FormData();
    formData.append('name', form.name || '');
    formData.append('description', form.description || '');
    formData.append('price', form.price.toString());
    formData.append('stock', form.stock.toString());
    formData.append('status', form.status || 'ACTIVE');

    if (isEditMode.value) {
      formData.append('current_image_url', form.current_image_url || '');
    }

    if (form.image) {
      formData.append('image', form.image);
    }

    if (isEditMode.value) {
      const productId = parseInt(route.params.id as string);
      await productService.updateProduct(productId, formData);
      toast.success('Product updated successfully!');
    } else {
      await productService.createProduct(formData);
      toast.success('Product created successfully!');
    }

    await router.push('/admin');
  } catch (error: any) {
    console.error('Error saving product:', error);

    // Handle specific error messages
    let errorMessage = 'Failed to save product. Please try again.';
    
    if (error.response?.data?.error) {
      errorMessage = `Failed to save product: ${error.response.data.error}`;
    } else if (error.response?.data?.details) {
      errorMessage = `Failed to save product: ${error.response.data.details}`;
    } else if (error.message?.includes('Network Error')) {
      errorMessage = 'Network error. Please check if the server is running.';
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    toast.error(errorMessage);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
