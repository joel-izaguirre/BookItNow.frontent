<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">BookItNow</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              v-if="!isAuthenticated"
              @click="login"
              class="btn-outline"
            >
              {{ $t('auth.login') }}
            </button>
            <button 
              v-if="!isAuthenticated"
              @click="register"
              class="btn-primary"
            >
              {{ $t('auth.register') }}
            </button>
            <button 
              v-if="isAuthenticated"
              @click="goToDashboard"
              class="btn-primary"
            >
              {{ $t('dashboard.title') }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="register"
            class="btn-primary text-lg px-8 py-3"
          >
            {{ $t('hero.getStarted') }}
          </button>
          <button 
            @click="scrollToFeatures"
            class="btn-outline text-lg px-8 py-3"
          >
            {{ $t('hero.learnMore') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ $t('features.title') }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ $t('features.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id" class="card text-center">
            <div class="text-blue-600 mb-4">
              <component :is="feature.icon" class="w-12 h-12 mx-auto" />
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ $t('pricing.title') }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ $t('pricing.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div v-for="plan in pricingPlans" :key="plan.id" class="card">
            <div class="text-center">
              <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
              <div class="text-4xl font-bold text-blue-600 mb-4">
                ${{ plan.price }}
                <span class="text-lg text-gray-500">/mes</span>
              </div>
              <p class="text-gray-600 mb-6">{{ plan.description }}</p>
              
              <ul class="text-left space-y-2 mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2" />
                  {{ feature }}
                </li>
              </ul>
              
              <button 
                @click="selectPlan(plan)"
                class="w-full btn-primary"
              >
                {{ plan.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">BookItNow</h3>
          <p class="text-gray-400 mb-4">
            {{ $t('footer.description') }}
          </p>
          <p class="text-gray-500 text-sm">
            © 2024 BookItNow. {{ $t('footer.rights') }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'
import { useClerk } from '@clerk/vue'
import { 
  CalendarDaysIcon, 
  UsersIcon, 
  ClockIcon,
  CheckIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const { openSignIn, openSignUp } = useClerk()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const features = [
  {
    id: 1,
    icon: CalendarDaysIcon,
    title: t('features.multiTenant.title'),
    description: t('features.multiTenant.description')
  },
  {
    id: 2,
    icon: UsersIcon,
    title: t('features.roleManagement.title'),
    description: t('features.roleManagement.description')
  },
  {
    id: 3,
    icon: ClockIcon,
    title: t('features.availability.title'),
    description: t('features.availability.description')
  },
  {
    id: 4,
    icon: ChartBarIcon,
    title: t('features.analytics.title'),
    description: t('features.analytics.description')
  },
  {
    id: 5,
    icon: ShieldCheckIcon,
    title: t('features.security.title'),
    description: t('features.security.description')
  }
]

const pricingPlans = [
  {
    id: 'free',
    name: t('subscription.free'),
    price: '0',
    description: t('pricing.free.description'),
    features: [
      t('pricing.free.features.employees'),
      t('pricing.free.features.managers'),
      t('pricing.free.features.features'),
      t('pricing.free.features.support')
    ],
    buttonText: t('pricing.free.button')
  },
  {
    id: 'premium',
    name: t('subscription.premium'),
    price: '100',
    description: t('pricing.premium.description'),
    features: [
      t('pricing.premium.features.employees'),
      t('pricing.premium.features.noAds'),
      t('pricing.premium.features.noBranding'),
      t('pricing.premium.features.prioritySupport')
    ],
    buttonText: t('pricing.premium.button')
  }
]

const login = () => {
  openSignIn()
}

const register = () => {
  if (isAuthenticated.value) {
    router.push('/register')
  } else {
    openSignUp()
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const selectPlan = (plan) => {
  if (plan.id === 'free') {
    register()
  } else {
    // Handle premium plan selection
    console.log('Premium plan selected')
  }
}
</script>

