<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-2xl mx-auto">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
        <div class="h-6 bg-gray-200 rounded w-48 mx-auto mb-3 animate-pulse"></div>
        <div class="h-3 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
      </div>
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="p-5 space-y-3">
          <div v-for="i in 6" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-md mx-auto">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
          <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h1 class="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h1>
        <p class="text-sm text-gray-600 mb-4">{{ error }}</p>
        <router-link
            to="/"
            class="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          Return to Home
        </router-link>
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Success Header -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">Order Confirmed!</h1>
        <p class="text-sm text-gray-600 mb-3">
          Thank you for your purchase. Your order #{{ order.order_id }} has been received.
        </p>
        <div class="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Payment successful
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Order Card -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <!-- Card Header -->
            <div class="bg-gray-900 p-4">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 class="text-lg font-semibold text-white">Order Details</h2>
                  <p class="text-gray-300 text-xs mt-0.5">Order #{{ order.order_id }}</p>
                </div>
                <div class="mt-2 sm:mt-0 text-left sm:text-right">
                  <div class="text-xs text-gray-300">Order Date</div>
                  <div class="text-sm font-medium text-white">{{ formatDate(order.created_at) }}</div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="p-4">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Order Items
                <span class="text-gray-500 font-normal">({{ order.items?.length || 0 }})</span>
              </h3>

              <div v-if="order.items && order.items.length > 0" class="space-y-2">
                <div
                    v-for="(item, index) in order.items"
                    :key="index"
                    class="flex items-center p-2.5 bg-gray-50 rounded-md"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <span class="font-semibold text-gray-700 text-xs">{{ item.quantity }}×</span>
                  </div>
                  <div class="flex-grow min-w-0">
                    <h4 class="font-medium text-gray-900 text-sm truncate">{{ item.product_name }}</h4>
                    <div class="flex flex-wrap items-center text-xs text-gray-500 mt-0.5 gap-1.5">
                      <span class="px-1.5 py-0.5 bg-gray-100 rounded text-xs">SKU: {{ formatProductId(item.product_id) }}</span>
                      <span>Unit: ${{ item.unit_price }}</span>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-sm font-semibold text-gray-900">${{ item.subtotal }}</div>
                    <div class="text-xs text-gray-500 mt-0.5">{{ item.quantity }} × ${{ item.unit_price }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-6 text-gray-500">
                <svg class="w-8 h-8 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p class="text-xs">No items found in this order</p>
              </div>
            </div>

            <!-- Price Summary -->
            <div class="p-4 bg-gray-50 border-t border-gray-200">
              <div class="space-y-2 max-w-md ml-auto">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium text-gray-900">${{ calculateSubtotal() }}</span>
                </div>
                <div class="flex justify-between items-center text-sm" v-if="order.shipping_cost">
                  <span class="text-gray-600">Shipping</span>
                  <span class="font-medium text-gray-900">${{ order.shipping_cost }}</span>
                </div>
                <div class="flex justify-between items-center text-sm" v-if="order.tax">
                  <span class="text-gray-600">Tax</span>
                  <span class="font-medium text-gray-900">${{ order.tax }}</span>
                </div>
                <div class="pt-2 border-t border-gray-300">
                  <div class="flex justify-between items-center">
                    <span class="text-base font-semibold text-gray-900">Total Amount</span>
                    <span class="text-lg font-bold text-green-600">${{ order.total_amount }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Status -->
            <div class="p-4 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div class="text-xs text-gray-500">Order Status</div>
                  <div class="text-sm font-semibold text-gray-900">{{ getStatusText(order.status) }}</div>
                </div>
                <div :class="[
                  'px-3 py-1 rounded-md font-medium text-xs',
                  getStatusColor(order.status)
                ]">
                  {{ order.status || 'PROCESSING' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div class="p-4">
              <h3 class="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v5h-1V7H6V5h8v2z"></path>
                </svg>
                Shipping Information
              </h3>

              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="bg-gray-50 p-2 rounded mr-3">
                    <svg class="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <div class="text-xs text-gray-500">Customer</div>
                    <div class="font-medium text-gray-900 text-sm">{{ order.customer_name }}</div>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-gray-50 p-2 rounded mr-3">
                    <svg class="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">Shipping Address</div>
                    <div class="font-medium text-gray-900 text-sm whitespace-pre-line">{{ order.shipping_address }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="flex items-center">
                    <div class="bg-gray-50 p-2 rounded mr-3">
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Phone</div>
                      <div class="font-medium text-gray-900 text-sm">{{ order.customer_phone || 'Not provided' }}</div>
                    </div>
                  </div>

                  <div class="flex items-center">
                    <div class="bg-gray-50 p-2 rounded mr-3">
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Email</div>
                      <div class="font-medium text-gray-900 text-sm">{{ order.customer_email }}</div>
                    </div>
                  </div>
                </div>

                <div v-if="order.billing_address" class="flex items-start">
                  <div class="bg-gray-50 p-2 rounded mr-3">
                    <svg class="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                      <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">Billing Address</div>
                    <div class="font-medium text-gray-900 text-sm">{{ order.billing_address }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Next Steps -->
          <div class="bg-blue-50 rounded-lg border border-blue-100 p-4 mb-6">
            <h3 class="font-semibold text-gray-900 text-sm mb-3 flex items-center">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              What's Next?
            </h3>
            <ul class="space-y-2.5">
              <li class="flex items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
                <span class="text-xs text-gray-700">Order confirmation email sent to <strong class="text-gray-900">{{ order.customer_email }}</strong></span>
              </li>
              <li class="flex items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
                <span class="text-xs text-gray-700">Order is being processed and prepared for shipping</span>
              </li>
              <li class="flex items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
                <span class="text-xs text-gray-700">Shipping confirmation with tracking information will be sent</span>
              </li>
              <li class="flex items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
                <span class="text-xs text-gray-700">Estimated delivery: <strong class="text-gray-900">3-5 business days</strong></span>
              </li>
            </ul>
          </div>

          <!-- Order Actions -->
          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <h3 class="font-semibold text-gray-900 text-sm mb-3">Order Actions</h3>
            <div class="space-y-2">
              <button
                  @click="printOrder"
                  class="w-full flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                Print Receipt
              </button>
              <router-link
                  to="/"
                  class="w-full flex items-center justify-center px-3 py-2 border border-gray-900 text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { orderService } from '@/services/api';
import {formatDate} from "@/composables/useDateFormatter.ts";

interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface Order {
  order_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  billing_address?: string;
  shipping_method?: string;
  shipping_cost?: number;
  tax?: number;
  total_amount: number;
  status?: string;
  created_at: string;
  items?: OrderItem[];
}

const route = useRoute();
const order = ref<Order>({} as Order);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  const orderId = parseInt(route.params.id.toString());

  if (isNaN(orderId)) {
    error.value = 'Invalid order ID';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    const response = await orderService.getOrder(orderId);

    if (response) {
      order.value = response;
    } else {
      error.value = 'Order not found';
    }
  } catch (err: any) {
    console.error('Failed to load order:', err);
    error.value = err.response?.data?.error || 'Failed to load order details';
  } finally {
    loading.value = false;
  }
});

function formatProductId(productId: number) {
  return `PROD-${productId?.toString().padStart(4, '0') || '0000'}`;
}

function calculateSubtotal() {
  if (!order.value.items) return 0;
  return order.value.items.reduce((sum, item) => sum + item.subtotal, 0);
}

function getStatusColor(status?: string) {
  switch (status?.toUpperCase()) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800';
    case 'SHIPPED':
      return 'bg-purple-100 text-purple-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status?: string) {
  switch (status?.toUpperCase()) {
    case 'COMPLETED':
      return 'Order Completed';
    case 'PROCESSING':
      return 'Processing Your Order';
    case 'SHIPPED':
      return 'Shipped';
    case 'CANCELLED':
      return 'Order Cancelled';
    case 'PENDING':
      return 'Pending Confirmation';
    default:
      return 'Processing';
  }
}

function printOrder() {
  window.print();
}
</script>

<style scoped>
/* Print styles */
@media print {
  nav,
  button,
  .no-print,
  .bg-gradient-to-r,
  .shadow-lg,
  .shadow-xl {
    display: none !important;
  }

  body {
    background: white !important;
    font-size: 12px;
  }

  .bg-white {
    background: white !important;
    border: 1px solid #e5e7eb !important;
  }

  .text-blue-600,
  .text-green-600,
  .text-purple-600 {
    color: black !important;
  }

  .bg-gradient-to-r {
    background: #f3f4f6 !important;
  }

  .max-w-4xl {
    max-width: 100% !important;
  }

  .grid {
    display: block !important;
  }

  .lg\:col-span-2,
  .lg\:col-span-1 {
    width: 100% !important;
  }
}
</style>