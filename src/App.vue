<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Discount Popup Modal -->
    <div 
      v-if="showDiscountPopup && !isAdminRoute" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      @click.self="closeDiscountPopup"
    >
      <div class="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100">
        <!-- Close Button -->
        <button 
          @click="closeDiscountPopup"
          class="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close popup"
        >
          <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Popup Image -->
        <div class="relative">
          <img 
            :src="popupImage" 
            alt="Special Discount Offer" 
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
    
    <!-- Top Announcement Bar -->
    <!-- <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 px-4 text-sm">
      🚚 Free shipping on orders over $50 | Shop now!
    </div> -->
    
    <!-- Main Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center" @click="forceUpdate">
              <img class="h-12 w-auto" src="./assets/lucky-store logo.png" alt="Lucky Store">
              <span class="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"></span>
            </router-link>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <router-link 
              to="/" 
              class="px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
              :class="{ 'text-blue-600': currentRoute === '/' }"
            >
              Home
            </router-link>
            <router-link to="/about" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" :class="{ 'text-blue-600': currentRoute === '/about' }">
              About
            </router-link>
            <router-link to="/contact" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" :class="{ 'text-blue-600': currentRoute === '/contact' }">
              Contact
            </router-link>
          </div>
          
          <!-- Right side icons -->
          <div class="flex items-center space-x-4">
            <router-link 
              to="/cart" 
              class="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              @click="forceUpdate"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-if="cartStore.items.length > 0" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartStore.items.length }}
              </span>
            </router-link>
            
            <router-link 
              to="/admin/login" 
              class="hidden md:flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="forceUpdate"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Dashboard
            </router-link>
            
            <!-- Mobile menu button -->
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link 
            to="/" 
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            Home
          </router-link>
          <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
            Shop
          </a>
          <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
            Categories
          </a>
          <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
            About
          </a>
          <a href="#" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
            Contact
          </a>
          <router-link 
            to="/admin/login" 
            class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            @click="isMobileMenuOpen = false"
          >
            Admin Dashboard
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view :key="routeKey" />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <!-- Brand Column -->
          <div class="lg:col-span-1">
            <div class="flex items-center mb-6">
              <div class="flex items-center">
                <img class="h-10 w-auto" src="./assets/lucky-store logo.png" alt="Lucky Store">
                <span class="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Lucky Store</span>
              </div>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6">
              Your go-to destination for the newest products and trends, featuring premium quality, fast delivery, and outstanding customer care.
            </p>
            <!-- Social Media -->
            <div class="flex space-x-4">
              <a href="#" class="bg-gray-800 hover:bg-blue-600 rounded-lg p-3 transition-all transform hover:scale-110" aria-label="Facebook">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="bg-gray-800 hover:bg-blue-400 rounded-lg p-3 transition-all transform hover:scale-110" aria-label="Twitter">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="bg-gray-800 hover:bg-pink-600 rounded-lg p-3 transition-all transform hover:scale-110" aria-label="Instagram">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="bg-gray-800 hover:bg-blue-700 rounded-lg p-3 transition-all transform hover:scale-110" aria-label="LinkedIn">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul class="space-y-3">
              <li>
                <router-link to="/" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </router-link>
              </li>
              <li>
                <router-link to="/admin/login" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Dashboard
                </router-link>
              </li>
            </ul>
          </div>
          
          <!-- Customer Service -->
          <div>
            <h3 class="text-lg font-bold mb-6 text-white">Customer Service</h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white text-sm transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Newsletter -->
          <div>
            <h3 class="text-lg font-bold mb-6 text-white">Newsletter</h3>
            <p class="text-gray-300 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest updates, exclusive offers, and special promotions.
            </p>
            <form @submit.prevent="handleNewsletterSubmit" class="space-y-4">
              <div class="flex flex-col sm:flex-row gap-2">
                <input 
                  v-model="newsletterEmail"
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                >
                <button 
                  type="submit"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </button>
              </div>
              <p v-if="newsletterSuccess" class="text-green-400 text-xs">Thank you for subscribing!</p>
            </form>
            <!-- Trust Badges -->
            <div class="mt-6 pt-6 border-t border-gray-700">
              <div class="flex items-center space-x-4 text-xs text-gray-400">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <!-- Copyright -->
            <div class="text-center md:text-left">
              <p class="text-gray-400 text-sm">
                &copy; {{ new Date().getFullYear() }} <span class="font-semibold text-white">Lucky Store</span>. All rights reserved.
              </p>
            </div>
            
            <!-- Payment Methods -->
            <div class="flex items-center space-x-2">
              <span class="text-gray-400 text-xs mr-2">We accept:</span>
              <div class="flex space-x-2">
                <div class="bg-white rounded px-2 py-1">
                  <span class="text-xs font-bold text-gray-800">VISA</span>
                </div>
                <div class="bg-white rounded px-2 py-1">
                  <span class="text-xs font-bold text-gray-800">MC</span>
                </div>
                <div class="bg-white rounded px-2 py-1">
                  <span class="text-xs font-bold text-gray-800">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button 
      v-show="isScrolled"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="Scroll to top"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
    
    <!-- Debug info -->
    <div v-if="showDebug" class="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-sm shadow-xl z-50">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-semibold text-yellow-400">Debug Info</h4>
        <button @click="toggleDebug" class="text-gray-400 hover:text-white">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="space-y-1">
        <p><span class="text-gray-400">Route:</span> {{ currentRoute }}</p>
        <p><span class="text-gray-400">Component Key:</span> {{ routeKey }}</p>
        <p><span class="text-gray-400">Cart Items:</span> {{ cartStore.items.length }}</p>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'
import { useCartStore } from './stores/cart';
import Toast from "@/components/ui/Toast.vue";
import popupImage from './assets/pop-up.png';

const route = useRoute();
const currentRoute = computed(() => route.path);
const routeKey = ref(0);
const cartStore = useCartStore();
const showDebug = ref(false);
const forceUpdateCounter = ref(0);
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const showDiscountPopup = ref(false);
const newsletterEmail = ref('');
const newsletterSuccess = ref(false);

// Check if current route is an admin route
const isAdminRoute = computed(() => route.path.startsWith('/admin'));

// Handle scroll effect for navbar
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10;
  });
  
  // Show discount popup when website opens/refreshes
  // Don't show on admin routes
  if (!isAdminRoute.value) {
    // Small delay to ensure smooth page load
    setTimeout(() => {
      // Double check route hasn't changed during the delay
      if (!isAdminRoute.value) {
        showDiscountPopup.value = true;
      }
    }, 500);
  }
});

// Close discount popup
const closeDiscountPopup = () => {
  showDiscountPopup.value = false;
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const forceUpdate = () => {
  console.log('🔄 Forcing route update')
  forceUpdateCounter.value++
  routeKey.value++
}

function toggleDebug() {
  showDebug.value = !showDebug.value
}

// Watch for route changes
watch(
    () => route.path,
    (newPath, oldPath) => {
      console.log(`🔄 Route changed: ${oldPath} → ${newPath}`)
      console.log('Route object:', route)
      
      // Scroll to top on route change
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Close popup if navigating to admin routes
      if (newPath.startsWith('/admin')) {
        showDiscountPopup.value = false;
      }
    },
    { immediate: true }
)

const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    newsletterSuccess.value = true;
    setTimeout(() => {
      newsletterSuccess.value = false;
      newsletterEmail.value = '';
    }, 3000);
  }
};

console.log('📱 App.vue loaded')
</script>