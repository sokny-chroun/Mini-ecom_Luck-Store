import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<{ email: string } | null>(null)

  // Default credentials
  const DEFAULT_EMAIL = 'admin'
  const DEFAULT_PASSWORD = '123'

  // Check if user is logged in (from localStorage)
  const initAuth = () => {
    const savedAuth = localStorage.getItem('admin_auth')
    if (savedAuth === 'true') {
      isAuthenticated.value = true
      user.value = { email: DEFAULT_EMAIL }
    }
  }

  // Login function
  const login = (email: string, password: string): boolean => {
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      isAuthenticated.value = true
      user.value = { email }
      localStorage.setItem('admin_auth', 'true')
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('admin_auth')
  }

  // Initialize on store creation
  initAuth()

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    login,
    logout,
    initAuth
  }
})

