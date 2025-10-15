<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">BookItNow</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              {{ currentUser?.firstName }} {{ currentUser?.lastName }}
            </span>
            <button @click="logout" class="btn-outline">
              {{ $t('auth.logout') }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t('dashboard.welcome', { name: currentUser?.firstName }) }}
        </h2>
        <p class="text-gray-600">
          {{ $t('dashboard.overview') }}
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button 
          @click="goToCalendar"
          class="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <CalendarDaysIcon class="w-8 h-8 text-blue-600 mb-2" />
          <h3 class="font-semibold">{{ $t('appointments.appointmentCalendar') }}</h3>
          <p class="text-sm text-gray-600">{{ $t('dashboard.quickActions.calendar') }}</p>
        </button>
        
        <button 
          @click="goToEmployees"
          class="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <UsersIcon class="w-8 h-8 text-green-600 mb-2" />
          <h3 class="font-semibold">{{ $t('employees.title') }}</h3>
          <p class="text-sm text-gray-600">{{ $t('dashboard.quickActions.employees') }}</p>
        </button>
        
        <button 
          @click="goToProfile"
          class="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <UserIcon class="w-8 h-8 text-purple-600 mb-2" />
          <h3 class="font-semibold">{{ $t('profile.title') }}</h3>
          <p class="text-sm text-gray-600">{{ $t('dashboard.quickActions.profile') }}</p>
        </button>
        
        <button 
          @click="goToSettings"
          class="card hover:shadow-md transition-shadow cursor-pointer"
        >
          <CogIcon class="w-8 h-8 text-gray-600 mb-2" />
          <h3 class="font-semibold">{{ $t('settings.title') }}</h3>
          <p class="text-sm text-gray-600">{{ $t('dashboard.quickActions.settings') }}</p>
        </button>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CalendarDaysIcon class="w-8 h-8 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.stats.todayAppointments') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.todayAppointments }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <UsersIcon class="w-8 h-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.stats.totalEmployees') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalEmployees }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ChartBarIcon class="w-8 h-8 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.stats.monthlyRevenue') }}</p>
              <p class="text-2xl font-semibold text-gray-900">${{ stats.monthlyRevenue }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ClockIcon class="w-8 h-8 text-orange-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.stats.avgAppointmentTime') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.avgAppointmentTime }}min</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Appointments -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">{{ $t('dashboard.recentAppointments') }}</h3>
        <div v-if="recentAppointments.length === 0" class="text-center py-8 text-gray-500">
          {{ $t('dashboard.noAppointments') }}
        </div>
        <div v-else class="space-y-4">
          <div 
            v-for="appointment in recentAppointments" 
            :key="appointment.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarDaysIcon class="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div class="ml-4">
                <p class="font-medium">{{ appointment.clientName }}</p>
                <p class="text-sm text-gray-600">{{ appointment.serviceName }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium">{{ formatTime(appointment.startTime) }}</p>
              <span :class="getStatusBadgeClass(appointment.status)">
                {{ $t(`appointments.status.${appointment.status.toLowerCase()}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'
import { 
  CalendarDaysIcon, 
  UsersIcon, 
  UserIcon,
  CogIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const currentUser = computed(() => authStore.currentUser)

const stats = ref({
  todayAppointments: 0,
  totalEmployees: 0,
  monthlyRevenue: 0,
  avgAppointmentTime: 0
})

const recentAppointments = ref([])

const getStatusBadgeClass = (status) => {
  const baseClass = 'badge'
  switch (status.toLowerCase()) {
    case 'confirmed':
      return `${baseClass} badge-success`
    case 'provisional':
      return `${baseClass} badge-warning`
    case 'cancelled':
      return `${baseClass} badge-danger`
    default:
      return `${baseClass} badge-info`
  }
}

const formatTime = (dateTime) => {
  return new Date(dateTime).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

const goToCalendar = () => {
  router.push('/calendar')
}

const goToEmployees = () => {
  router.push('/employees')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToSettings = () => {
  router.push('/settings')
}

onMounted(async () => {
  // Load dashboard data
  try {
    // This will be implemented when we have the API
    console.log('Loading dashboard data...')
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
})
</script>

