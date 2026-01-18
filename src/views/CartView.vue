<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        <p class="text-sm text-gray-500 mt-1">Review your items and proceed to checkout</p>
      </div>
    </div>

    <!-- Cart Content -->
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
          <p class="text-sm text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
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

      <!-- Cart with Items -->
      <div v-else class="lg:grid lg:grid-cols-3 lg:gap-6">
        <!-- Cart Items Section -->
        <div class="lg:col-span-2 space-y-3">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Items ({{ cartStore.items.length }})</h2>
            </div>
            <button
              @click="showClearCartConfirmation"
              class="text-sm text-gray-600 hover:text-red-600 font-medium flex items-center transition-colors"
            >
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Clear Cart
            </button>
          </div>

          <!-- Cart Items -->
          <div class="space-y-3">
            <div
              v-for="item in cartStore.items"
              :key="item.product_id"
              class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div class="p-4">
                <div class="flex gap-4">
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <div class="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                      <img
                        :src="item.image_url || 'https://via.placeholder.com/200x200?text=Product'"
                        :alt="item.name"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      >
                    </div>
                  </div>

                  <!-- Product Details -->
                  <div class="flex-grow min-w-0">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-grow min-w-0">
                        <h3 class="text-sm font-semibold text-gray-900 mb-1 truncate">{{ item.name }}</h3>
                        <p class="text-xs text-gray-500 mb-2">ID: {{ item.product_id }}</p>
                        <div class="flex items-center gap-2 mb-2">
                          <span class="text-base font-semibold text-gray-900">{{ formatPrice(item.price) }}</span>
                          <span class="text-xs text-gray-500">each</span>
                        </div>
                        
                        <!-- Stock Warning -->
                        <div v-if="item.availableStock <= 5 && item.quantity <= item.availableStock" 
                             class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 mb-2">
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                          Only {{ item.availableStock }} left
                        </div>

                        <!-- Quantity Controls -->
                        <div class="flex items-center gap-3">
                          <label class="text-xs text-gray-600 font-medium">Qty:</label>
                          <div class="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button
                              @click="decrementQuantity(item.product_id)"
                              :disabled="item.quantity <= 1"
                              class="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <input
                              v-model.number="item.quantity"
                              @change="updateQuantityInput(item.product_id, item.quantity)"
                              type="number"
                              min="1"
                              :max="item.availableStock"
                              class="w-12 h-8 text-center border-0 focus:ring-1 focus:ring-gray-400 text-sm font-medium"
                            >
                            <button
                              @click="incrementQuantity(item.product_id)"
                              :disabled="item.quantity >= item.availableStock"
                              class="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Subtotal and Actions -->
                      <div class="flex flex-col items-end gap-2 flex-shrink-0">
                        <div class="text-right">
                          <p class="text-xs text-gray-500 mb-0.5">Subtotal</p>
                          <p class="text-base font-semibold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
                        </div>
                        <button
                          @click="showDeleteConfirmation(item)"
                          class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove item"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Shopping Button -->
          <div class="pt-4">
            <router-link 
              to="/" 
              class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1 mt-6 lg:mt-0">
          <div class="bg-white rounded-lg border border-gray-200 p-5 lg:sticky lg:top-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-5">
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

              <div class="border-t border-gray-200 pt-3">
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
            <div class="mb-5 space-y-2 pb-5 border-b border-gray-200">
              <div class="flex items-start text-green-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">Free shipping</span>
              </div>
              <div class="flex items-start text-green-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">10% off over $100</span>
              </div>
              <div class="flex items-start text-blue-600">
                <svg class="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs font-medium">Secure checkout</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="goToCheckout"
              :disabled="cartStore.items.length === 0"
              class="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proceed to Checkout
              </span>
            </button>

            <!-- Security Badge -->
            <div class="mt-3 text-center">
              <p class="text-xs text-gray-500 flex items-center justify-center">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Secure & Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="isConfirmOpen"
      :title="confirmOptions.title"
      :message="confirmOptions.message"
      :confirm-text="confirmOptions.confirmText"
      :cancel-text="confirmOptions.cancelText"
      :icon="confirmOptions.icon"
      :icon-container-class="confirmOptions.iconContainerClass"
      :icon-class="confirmOptions.iconClass"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';
import { useFormatters } from '@/composables/useFormatters';
import { useToast } from "@/composables/useToast";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import { ref, computed } from 'vue';

const cartStore = useCartStore();
const router = useRouter();
const { formatPrice } = useFormatters();
const { toast } = useToast();

// Dialog state
const isConfirmOpen = ref(false);
const confirmOptions = ref({
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  icon: ExclamationTriangleIcon,
  iconContainerClass: '',
  iconClass: ''
});

// Pending actions
const pendingAction = ref<{
  type: 'removeItem' | 'clearCart';
  productId?: number;
  itemName?: string;
} | null>(null);

// Computed properties
const discountAmount = computed(() => {
  return cartStore.totalPrice > 100 ? cartStore.totalPrice * 0.1 : 0;
});

const finalTotal = computed(() => {
  return cartStore.totalPrice - discountAmount.value;
});

// Confirmation dialog functions
const showDeleteConfirmation = (item: any) => {
  pendingAction.value = {
    type: 'removeItem',
    productId: item.product_id,
    itemName: item.name
  };

  confirmOptions.value = {
    title: 'Remove Item',
    message: `Are you sure you want to remove "${item.name}" from your cart?`,
    confirmText: 'Remove',
    cancelText: 'Keep Item',
    icon: TrashIcon,
    iconContainerClass: 'bg-red-100',
    iconClass: 'text-red-600'
  };

  isConfirmOpen.value = true;
};

const showClearCartConfirmation = () => {
  pendingAction.value = {
    type: 'clearCart'
  };

  confirmOptions.value = {
    title: 'Clear Cart',
    message: `Are you sure you want to clear your entire cart? This will remove ${cartStore.items.length} item(s).`,
    confirmText: 'Clear Cart',
    cancelText: 'Keep Items',
    icon: ExclamationTriangleIcon,
    iconContainerClass: 'bg-yellow-100',
    iconClass: 'text-yellow-600'
  };

  isConfirmOpen.value = true;
};

const handleConfirm = () => {
  if (!pendingAction.value) return;

  switch (pendingAction.value.type) {
    case 'removeItem':
      if (pendingAction.value.productId) {
        cartStore.removeFromCart(pendingAction.value.productId);
        toast.success(`"${pendingAction.value.itemName}" removed from cart`);
      }
      break;

    case 'clearCart':
      cartStore.clearCart();
      toast.success('Cart cleared successfully');
      break;
  }

  pendingAction.value = null;
  isConfirmOpen.value = false;
};

const handleCancel = () => {
  pendingAction.value = null;
  isConfirmOpen.value = false;
};

// Quantity management
const decrementQuantity = (productId: number) => {
  const item = cartStore.items.find(item => item.product_id === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

const incrementQuantity = (productId: number) => {
  const item = cartStore.items.find(item => item.product_id === productId);
  if (item && item.quantity < item.availableStock) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  } else if (item) {
    toast.error(`Cannot add more. Only ${item.availableStock} available in stock.`);
  }
};

const updateQuantityInput = (productId: number, newQuantity: number) => {
  const item = cartStore.items.find(item => item.product_id === productId);

  if (!item) return;

  if (newQuantity < 1) {
    cartStore.updateQuantity(productId, 1);
    toast.info('Quantity cannot be less than 1');
    return;
  }

  if (newQuantity > item.availableStock) {
    cartStore.updateQuantity(productId, item.availableStock);
    toast.error(`Quantity limited to ${item.availableStock} (available stock)`);
    return;
  }

  cartStore.updateQuantity(productId, newQuantity);
};

// Calculations
const calculateTotal = () => {
  return finalTotal.value;
};

// Navigation
const goToCheckout = () => {
  if (cartStore.items.length === 0) {
    toast.error('Your cart is empty');
    return;
  }
  router.push('/checkout');
};

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

