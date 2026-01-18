<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
    <!-- Hero Section with Enhanced Animations -->
    <section class="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-slide-down">
            About <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 animate-gradient">Lucky Store</span>
          </h1>
          <p class="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Your trusted partner in quality shopping. We're committed to bringing you the best products with exceptional service.
          </p>
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

    <!-- Our Story Section with Animations -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1 animate-slide-right">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-pulse-slow">
              Our Journey
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">Our Story</h2>
            <p class="text-lg text-gray-700 mb-4 leading-relaxed animate-fade-in-up animation-delay-200">
              Lucky Store was founded in 2023 with a simple mission: to help you find exactly what you need at a price you'll love. We started as a humble online shop driven by a big dream of bringing high-quality essentials to your doorstep.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed animate-fade-in-up animation-delay-300">
              Today, we are proud to be a trusted destination where quality meets convenience. For us, every customer is a priority, and every purchase is a promise of excellent service.
            </p>
          </div>
        </div>
        <div class="order-1 md:order-2 animate-slide-left">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-6 animate-float"></div>
            <div class="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div class="grid grid-cols-2 gap-6">
                <div 
                  v-for="(stat, index) in [
                    { value: '2023', label: 'Founded', color: 'text-blue-600' },
                    { value: '1000+', label: 'Happy Customers', color: 'text-indigo-600' },
                    { value: '500+', label: 'Products', color: 'text-purple-600' },
                    { value: '24/7', label: 'Support', color: 'text-pink-600' }
                  ]"
                  :key="index"
                  :style="{ animationDelay: `${index * 0.15}s` }"
                  class="text-center animate-count-up"
                >
                  <div :class="[stat.color, 'text-4xl md:text-5xl font-bold mb-2']">{{ stat.value }}</div>
                  <div class="text-sm text-gray-600 font-medium">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section with Enhanced Animations -->
    <section class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up">
          <div class="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-4 animate-pulse-slow">
            Our Commitment
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-down">Our Mission</h2>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            We are committed to delivering a seamless shopping experience—from exploring our carefully curated selection to the moment your order arrives at your doorstep.
          </p>
        </div>
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-300">
          <p class="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Every product in our inventory is thoughtfully selected to meet our high standards of quality, reliability, and value. We believe that shopping should be enjoyable, convenient, and trustworthy—that's why we've built Lucky Store with your satisfaction as our top priority.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section with Staggered Animations -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16 animate-fade-in-up">
        <div class="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-4 animate-pulse-slow">
          Why Choose Us
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slide-down">What Makes Us Different</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          We go above and beyond to ensure your shopping experience is exceptional
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(feature, index) in [
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', bgClass: 'bg-green-100', textClass: 'text-green-600', title: 'Quality Products', desc: 'Carefully curated selection of high-quality products that meet our strict standards' },
            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', bgClass: 'bg-blue-100', textClass: 'text-blue-600', title: 'Fast Shipping', desc: 'Fast and reliable shipping to get your orders to you as quickly as possible' },
            { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', bgClass: 'bg-purple-100', textClass: 'text-purple-600', title: 'Great Service', desc: 'Exceptional customer service with a team dedicated to helping you' },
            { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', bgClass: 'bg-orange-100', textClass: 'text-orange-600', title: 'Secure Checkout', desc: 'Secure checkout process to protect your personal and payment information' }
          ]"
          :key="index"
          :style="{ animationDelay: `${index * 0.15}s` }"
          class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center group animate-slide-up-fade"
        >
          <div :class="[feature.bgClass, 'rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300']">
            <svg class="h-10 w-10" :class="feature.textClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3 transform group-hover:scale-105 transition-transform">{{ feature.title }}</h3>
          <p class="text-gray-600 leading-relaxed">
            {{ feature.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section with Enhanced Animations -->
    <section class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
        <div class="absolute bottom-10 right-10 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 animate-slide-down">Our Core Values</h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            The principles that guide everything we do
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in [
              { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Customer First', desc: 'Your satisfaction is our top priority. We listen, learn, and adapt to serve you better.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Integrity', desc: 'We operate with honesty, transparency, and ethical business practices in everything we do.' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Innovation', desc: 'We continuously improve our services and embrace new technologies to enhance your experience.' }
            ]"
            :key="index"
            :style="{ animationDelay: `${index * 0.2}s` }"
            class="text-center group animate-slide-up-fade"
          >
            <div class="bg-white bg-opacity-20 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 backdrop-blur-sm">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 transform group-hover:scale-105 transition-transform">{{ value.title }}</h3>
            <p class="text-blue-100 leading-relaxed">
              {{ value.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section with Enhanced Animations -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden animate-fade-in-up">
        <!-- Animated Background -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 animate-pulse-slow"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32 animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div class="relative z-10">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">Have Questions?</h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            We'd love to hear from you! Get in touch with our team and we'll be happy to help.
          </p>
          <router-link
            to="/contact"
            class="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-bounce-subtle"
          >
            <span>Contact Us</span>
            <svg class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Animate numbers on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement
        element.classList.add('animate-count-up')
      }
    })
  }, observerOptions)

  // Observe all count-up elements
  const countElements = document.querySelectorAll('.animate-count-up')
  countElements.forEach(el => observer.observe(el))
})
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
    transform: translateY(0) rotate(6deg);
  }
  50% {
    transform: translateY(-10px) rotate(6deg);
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

@keyframes count-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-count-up {
  animation: count-up 0.8s ease-out;
  animation-fill-mode: both;
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
</style>
