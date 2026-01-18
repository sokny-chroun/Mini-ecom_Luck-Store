<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-semibold text-gray-900">Checkout</h1>
        <p class="text-sm text-gray-500 mt-1">Complete your order</p>
      </div>
    </div>

    <!-- Checkout Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty Cart State -->
      <div v-if="cartStore.items.length === 0" class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div class="bg-gray-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p class="text-sm text-gray-600 mb-6">Add some products to your cart before checkout</p>
          <router-link 
            to="/" 
            class="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-else class="lg:grid lg:grid-cols-3 lg:gap-6">
        <!-- Customer Information Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-gray-200 p-5">
            <div class="mb-5">
              <h2 class="text-lg font-semibold text-gray-900 mb-1">Customer Information</h2>
              <p class="text-xs text-gray-500">Please fill in your details to complete your order</p>
            </div>

            <form @submit.prevent="submitOrder" class="space-y-4">
              <!-- Full Name -->
              <div>
                <label for="name" class="block text-xs font-medium text-gray-700 mb-1.5">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    required
                    class="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="Enter your full name"
                  >
                </div>
              </div>

              <!-- Email Address -->
              <div>
                <label for="email" class="block text-xs font-medium text-gray-700 mb-1.5">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    required
                    class="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="your.email@example.com"
                  >
                </div>
              </div>

              <!-- Phone Number -->
              <div>
                <label for="phone" class="block text-xs font-medium text-gray-700 mb-1.5">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    v-model="form.phone"
                    type="tel"
                    id="phone"
                    required
                    class="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="(123) 456-7890"
                  >
                </div>
              </div>

              <!-- Shipping Address -->
              <div>
                <label for="address" class="block text-xs font-medium text-gray-700 mb-1.5">
                  Shipping Address <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute top-2.5 left-3 pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <textarea
                    v-model="form.address"
                    id="address"
                    required
                    rows="3"
                    class="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
                    placeholder="Enter your complete shipping address"
                  ></textarea>
                </div>
              </div>

              <!-- Security Notice -->
              <div class="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div class="flex items-start">
                  <svg class="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="text-xs font-medium text-blue-900">Secure Checkout</p>
                    <p class="text-xs text-blue-700 mt-0.5">Your information is encrypted and secure.</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1 mt-6 lg:mt-0">
          <div class="bg-white rounded-lg border border-gray-200 p-5 lg:sticky lg:top-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <!-- Order Items -->
            <div class="mb-5 space-y-3 max-h-48 overflow-y-auto">
              <div 
                v-for="item in cartStore.items" 
                :key="item.product_id" 
                class="flex items-center gap-2.5 pb-3 border-b border-gray-100 last:border-0"
              >
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                    <img
                      :src="item.image_url || 'https://via.placeholder.com/80x80?text=Product'"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    >
                  </div>
                </div>
                <div class="flex-grow min-w-0">
                  <h3 class="font-medium text-gray-900 text-xs truncate">{{ item.name }}</h3>
                  <p class="text-xs text-gray-500">
                    {{ formatPrice(item.price) }} × {{ item.quantity }}
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <span class="font-semibold text-gray-900 text-sm">
                    {{ formatPrice(item.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2.5 mb-5 pb-5 border-b border-gray-200">
              <div class="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span class="font-medium">{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
              
              <div class="flex justify-between text-sm text-gray-700">
                <span>Shipping</span>
                <span class="text-green-600 font-medium">FREE</span>
              </div>

              <div v-if="discountAmount > 0" class="flex justify-between text-sm text-gray-700">
                <span class="text-green-600">Discount (10%)</span>
                <span class="text-green-600 font-medium">-{{ formatPrice(discountAmount) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-2.5 mt-2.5">
                <div class="flex justify-between items-center">
                  <span class="text-base font-semibold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-gray-900">{{ formatPrice(calculateTotal()) }}</span>
                </div>
                
                <div v-if="cartStore.totalPrice < 100" class="mt-2 p-2 bg-blue-50 rounded-md">
                  <p class="text-xs text-gray-700">
                    <span class="font-medium text-blue-600">Add {{ formatPrice(100 - cartStore.totalPrice) }} more</span>
                    <span class="text-gray-600"> for 10% off</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Benefits -->
            <div class="mb-5 space-y-1.5 pb-5 border-b border-gray-200">
              <div class="flex items-center text-green-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">Free shipping</span>
              </div>
              <div class="flex items-center text-green-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">Secure payment</span>
              </div>
              <div class="flex items-center text-blue-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">Order tracking</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              type="submit"
              @click="submitOrder"
              :disabled="loading || !isFormValid"
              class="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Place Order
              </span>
            </button>

            <!-- Terms -->
            <p class="text-xs text-gray-500 text-center mb-4">
              By placing your order, you agree to our
              <a href="#" class="text-gray-700 hover:underline font-medium">Terms</a>
              and
              <a href="#" class="text-gray-700 hover:underline font-medium">Privacy Policy</a>
            </p>

            <!-- Back to Cart -->
            <div class="pt-4 border-t border-gray-200">
              <router-link 
                to="/cart" 
                class="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Cart
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { orderService } from '../services/api';
import { useFormatters } from '@/composables/useFormatters';
import { useToast } from '@/composables/useToast';

const cartStore = useCartStore();
const router = useRouter();
const loading = ref(false);
const { formatPrice } = useFormatters();
const { toast } = useToast();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
});

// Form validation
const isFormValid = computed(() => {
  return form.name.trim() !== '' &&
         form.email.trim() !== '' &&
         form.phone.trim() !== '' &&
         form.address.trim() !== '';
});

// Discount calculation
const discountAmount = computed(() => {
  return cartStore.totalPrice > 100 ? cartStore.totalPrice * 0.1 : 0;
});

function calculateTotal() {
  let total = cartStore.totalPrice;
  if (total > 100) {
    total *= 0.9; // 10% discount
  }
  return total;
}

async function submitOrder() {
  if (loading.value || !isFormValid.value) return;

  try {
    loading.value = true;

    const orderData = {
      customer_name: form.name.trim(),
      customer_email: form.email.trim(),
      customer_phone: form.phone.trim(),
      shipping_address: form.address.trim(),
      total_amount: calculateTotal(),
      items: cartStore.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      }))
    };

    const order = await orderService.createOrder(orderData);
    
    // Show success message
    toast.success('Order placed successfully!');
    
    // Clear cart and redirect to confirmation
    cartStore.clearCart();
    await router.push(`/order-confirmation/${order['order_id']}`);

  } catch (error: any) {
    console.error('Error placing order:', error);
    
    let errorMessage = 'Failed to place order. Please try again.';
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
}

// Image error handling
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const fallbackUrl = 'https://via.placeholder.com/400x300?text=Product+Image';
  if (img.src !== fallbackUrl && !img.src.includes('placeholder.com')) {
    img.src = fallbackUrl;
    img.onerror = null;
  }
};
</script>

