<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
    <!-- Hero Section with Enhanced Animations -->
    <section class="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-slide-down">
            Welcome to <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 animate-gradient">Lucky Store</span>
          </h1>
          <p class="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Discover amazing products at unbeatable prices. Quality you can trust, delivered to your door.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-500">
            <router-link
              to="#products"
              class="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-bounce-subtle"
            >
              <span>Shop Now</span>
              <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <a
              href="#features"
              class="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transform hover:scale-110 transition-all duration-300 hover:shadow-xl"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <!-- Animated Decorative waves -->
      <div class="absolute bottom-0 left-0 right-0 animate-wave">
        <svg class="w-full h-12 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>

    <!-- Trust Badges Section with Floating Animation -->
    <section class="bg-white border-b border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div 
            v-for="(badge, index) in [
              { icon: 'M5 13l4 4L19 7', bgClass: 'bg-blue-100', textClass: 'text-blue-600', title: 'Quality Assured', desc: 'Premium Products' },
              { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', bgClass: 'bg-green-100', textClass: 'text-green-600', title: 'Free Shipping', desc: 'Over $50 Orders' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', bgClass: 'bg-purple-100', textClass: 'text-purple-600', title: 'Best Prices', desc: 'Competitive Rates' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bgClass: 'bg-orange-100', textClass: 'text-orange-600', title: 'Secure Payment', desc: '100% Protected' }
            ]"
            :key="index"
            :style="{ animationDelay: `${index * 0.15}s` }"
            class="flex flex-col items-center animate-slide-up hover:animate-float"
          >
            <div :class="[badge.bgClass, 'rounded-full p-4 mb-3 transform hover:scale-110 transition-transform duration-300 animate-pulse-slow']">
              <svg class="h-8 w-8" :class="badge.textClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="badge.icon" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 transform hover:scale-105 transition-transform">{{ badge.title }}</h3>
            <p class="text-sm text-gray-600">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section id="products" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8 animate-fade-in-up animation-delay-700">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div class="animate-slide-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
            <p class="text-gray-600">Discover our curated collection of premium products</p>
          </div>
          <div class="relative w-full md:w-96 animate-slide-left">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products by name or description..."
              class="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md transform hover:scale-105"
            >
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-6 text-lg text-gray-600 font-medium animate-pulse">Loading amazing products...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto animate-shake">
        <div class="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 animate-bounce">
          <svg class="h-8 w-8 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p class="text-red-600 mb-6">{{ error }}</p>
        <button 
          @click="fetchProducts" 
          class="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 animate-fade-in">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-pulse">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-700 mb-3">No products found</h2>
        <p class="text-gray-500 mb-2 text-lg">{{ searchQuery ? 'Try adjusting your search terms' : 'Check back later for new products' }}</p>
        <button 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="mt-4 text-blue-600 hover:text-blue-700 font-semibold transform hover:scale-110 transition-transform"
        >
          Clear search
        </button>
      </div>

      <!-- Products grid with Staggered Animations -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-6">
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.product_id"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full transform animate-slide-up-fade"
        >
          <div class="relative overflow-hidden bg-gray-50">
            <div class="aspect-w-1 aspect-h-1 w-full">
              <img
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                @error="handleImageError"
              >
            </div>
            
            <!-- Stock Status Badge with Pulse -->
            <div class="absolute top-4 right-4">
              <span v-if="product.stock < 10 && product.stock > 0" 
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg animate-pulse">
                <span class="w-2 h-2 mr-1.5 bg-white rounded-full animate-ping"></span>
                Only {{ product.stock }} left
              </span>
              <span v-else-if="product.stock === 0" 
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gray-500 text-white shadow-lg">
                <span class="w-2 h-2 mr-1.5 bg-white rounded-full"></span>
                Out of Stock
              </span>
              <span v-else
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg animate-pulse-slow">
                <span class="w-2 h-2 mr-1.5 bg-white rounded-full"></span>
                In Stock
              </span>
            </div>

            <!-- Discount Badge with Bounce -->
            <div v-if="product.originalPrice && Number(product.originalPrice) > Number(product.price)" 
                 class="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce-subtle">
              {{ Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100) }}% OFF
            </div>
          </div>

          <div class="p-5 flex flex-col flex-grow">
            <div class="flex-grow mb-4">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 transform group-hover:scale-105 transition-transform">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{{ product.description || 'Premium quality product' }}</p>
            </div>

            <div class="mt-auto space-y-4">
              <div class="flex items-center justify-between">
                <div class="animate-count-up">
                  <span class="text-2xl font-extrabold text-gray-900">{{ formatPrice(product.price) }}</span>
                  <span v-if="product.originalPrice && Number(product.originalPrice) > Number(product.price)" 
                        class="ml-2 text-sm text-gray-500 line-through">
                    {{ formatPrice(product.originalPrice) }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col space-y-2">
                <router-link
                  :to="`/product/${product.product_id}`"
                  class="w-full inline-flex items-center justify-center px-4 py-2.5 border-2 border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                  <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </router-link>
                
                <button
                  @click="addToCart(product)"
                  :disabled="product.stock === 0 || addingToCartId === product.product_id"
                  class="w-full inline-flex items-center justify-center px-4 py-2.5 border-2 border-transparent rounded-lg shadow-md text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95"
                >
                  <template v-if="addingToCartId === product.product_id">
                    <svg class="animate-spin mr-1.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </template>
                  <template v-else>
                    <svg class="mr-1.5 h-4 w-4 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Enhanced Animations -->
    <section id="features" class="bg-gradient-to-b from-gray-50 to-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl font-bold text-gray-900 mb-4 animate-slide-down">Why Choose Us?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">We're committed to providing you with the best shopping experience</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in [
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', bgClass: 'bg-blue-100', textClass: 'text-blue-600', title: 'Fast Delivery', desc: 'Get your orders delivered quickly and safely to your doorstep' },
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', bgClass: 'bg-green-100', textClass: 'text-green-600', title: 'Quality Guarantee', desc: 'All products are carefully selected and quality tested before shipping' },
              { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', bgClass: 'bg-purple-100', textClass: 'text-purple-600', title: '24/7 Support', desc: 'Our customer service team is always here to help you' }
            ]"
            :key="index"
            :style="{ animationDelay: `${index * 0.2}s` }"
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up-fade hover:-translate-y-2 group"
          >
            <div :class="[feature.bgClass, 'rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300']">
              <svg class="h-8 w-8" :class="feature.textClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 transform group-hover:scale-105 transition-transform">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {useCartStore} from '@/stores/cart'
import {productService} from '@/services/api'
import { useFormatters } from '@/composables/useFormatters'
import {useToast} from "@/composables/useToast.ts";

// Define interface for Product
interface Product {
  product_id: number
  name: string
  description: string
  price: number | string
  originalPrice?: number | string
  stock: number
  image_url?: string
  status: string
  created_at: string
}

// Define reactive variables
const products = ref<Product[]>([])
const filteredProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    filteredProducts.value = [...products.value]
    return
  }
  
  const query = newQuery.toLowerCase().trim()
  filteredProducts.value = products.value.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description?.toLowerCase().includes(query)
  )
})
const addingToCartId = ref<number | null>(null)

// Initialize cart store
const cartStore = useCartStore()
const { formatPrice } = useFormatters()
const {toast} = useToast()

// Fetch products on mount
onMounted(() => {
  fetchProducts()
})

// Fetch products function
async function fetchProducts() {
  try {
    loading.value = true
    products.value = await productService.getProducts({status: 'active'})
    filteredProducts.value = [...products.value]
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products'
  } finally {
    loading.value = false
  }
}

// Add to cart function
async function addToCart(product: Product) {
  if (product.stock <= 0) return

  try {
    addingToCartId.value = product.product_id

    await new Promise(resolve => setTimeout(resolve, 300))

    const item = cartStore.items.find((e) => e.product_id == product.product_id);
    if(item && item.quantity >= product.stock){
      toast.error(`Influenced stock: ${product.stock}`)
    } else {
      cartStore.addToCart({
        product_id: product.product_id,
        name: product.name,
        price: parseFloat(product.price.toString()),
        quantity: 1,
        image_url: product.image_url,
        availableStock: product.stock
      })
      toast.success(`Added ${product.name} to cart!`)
    }

  } catch (err) {
    error.value = 'Failed to add item to cart. Please try again.'
  } finally {
    addingToCartId.value = null
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  const fallbackUrl = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
  if (img.src !== fallbackUrl && !img.src.includes('placeholder.com')) {
    img.src = fallbackUrl
    img.onerror = null
  }
}
</script>

<style scoped>
/* Base Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Animation Classes */
.animate-slide-down {
  animation: slide-down 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-slide-up-fade {
  animation: slide-up-fade 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-slide-right {
  animation: slide-right 0.8s ease-out;
}

.animate-slide-left {
  animation: slide-left 0.8s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
