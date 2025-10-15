import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useClerk, useUser } from '@clerk/vue'
import { authService } from '@/services/services'

export const useAuthStore = defineStore('auth', () => {
  const { user: clerkUser, isLoaded, isSignedIn, signOut } = useClerk()
  const { user } = useUser()
  
  const currentUser = ref(null)
  const currentTenant = ref(null)
  const userRole = ref(null)
  const isLoading = ref(false)
  
  const isAuthenticated = computed(() => isSignedIn.value)
  
  const setCurrentUser = (user) => {
    currentUser.value = user
  }
  
  const setCurrentTenant = (tenant) => {
    currentTenant.value = tenant
  }
  
  const setUserRole = (role) => {
    userRole.value = role
  }
  
  const syncUser = async () => {
    if (!isAuthenticated.value) return
    
    try {
      isLoading.value = true
      const userData = await authService.getCurrentUser()
      setCurrentUser(userData)
    } catch (error) {
      console.error('Error syncing user:', error)
      // Try to register user if not found
      try {
        const newUser = await authService.registerUser()
        setCurrentUser(newUser)
      } catch (registerError) {
        console.error('Error registering user:', registerError)
      }
    } finally {
      isLoading.value = false
    }
  }
  
  const registerBusiness = async (businessData) => {
    try {
      isLoading.value = true
      const tenant = await authService.registerBusiness(businessData)
      setCurrentTenant(tenant)
      return tenant
    } catch (error) {
      console.error('Error registering business:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  const logout = async () => {
    try {
      await signOut()
      currentUser.value = null
      currentTenant.value = null
      userRole.value = null
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  
  return {
    clerkUser,
    user,
    isLoaded,
    isAuthenticated,
    isLoading,
    currentUser,
    currentTenant,
    userRole,
    setCurrentUser,
    setCurrentTenant,
    setUserRole,
    syncUser,
    registerBusiness,
    logout
  }
})