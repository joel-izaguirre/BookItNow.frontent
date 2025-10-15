import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useClerk } from '@clerk/vue'

export const useAuthStore = defineStore('auth', () => {
  const { user, isLoaded, isSignedIn } = useClerk()
  
  const currentUser = ref(null)
  const currentTenant = ref(null)
  const userRole = ref(null)
  
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
  
  const logout = async () => {
    currentUser.value = null
    currentTenant.value = null
    userRole.value = null
  }
  
  return {
    user,
    isLoaded,
    isAuthenticated,
    currentUser,
    currentTenant,
    userRole,
    setCurrentUser,
    setCurrentTenant,
    setUserRole,
    logout
  }
})
