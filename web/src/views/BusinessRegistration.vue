<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ $t('business.registerBusiness') }}
        </h1>
        <p class="text-gray-600">
          {{ $t('business.registerDescription') }}
        </p>
      </div>

      <div class="card">
        <form @submit.prevent="registerBusiness" class="space-y-6">
          <!-- Business Name -->
          <div>
            <label for="name" class="form-label">
              {{ $t('business.name') }} *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="form-input"
              :placeholder="$t('business.namePlaceholder')"
            />
            <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
          </div>

          <!-- Business URL -->
          <div>
            <label for="slug" class="form-label">
              {{ $t('business.slug') }} *
            </label>
            <div class="flex">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                bookitnow.com/
              </span>
              <input
                id="slug"
                v-model="form.slug"
                type="text"
                required
                class="form-input rounded-l-none"
                :placeholder="$t('business.slugPlaceholder')"
                @input="generateSlug"
              />
            </div>
            <p v-if="errors.slug" class="form-error">{{ errors.slug }}</p>
            <p class="text-sm text-gray-500 mt-1">
              {{ $t('business.slugHelp') }}
            </p>
          </div>

          <!-- Optional Information -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ $t('business.optionalInfo') }}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Phone -->
              <div>
                <label for="phone" class="form-label">
                  {{ $t('business.phone') }}
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  :placeholder="$t('business.phonePlaceholder')"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="form-label">
                  {{ $t('business.email') }}
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :placeholder="$t('business.emailPlaceholder')"
                />
              </div>

              <!-- Address -->
              <div class="md:col-span-2">
                <label for="address" class="form-label">
                  {{ $t('business.address') }}
                </label>
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  class="form-input"
                  :placeholder="$t('business.addressPlaceholder')"
                />
              </div>

              <!-- Website -->
              <div>
                <label for="website" class="form-label">
                  {{ $t('business.website') }}
                </label>
                <input
                  id="website"
                  v-model="form.website"
                  type="url"
                  class="form-input"
                  placeholder="https://"
                />
              </div>

              <!-- Slogan -->
              <div>
                <label for="slogan" class="form-label">
                  {{ $t('business.slogan') }}
                </label>
                <input
                  id="slogan"
                  v-model="form.slogan"
                  type="text"
                  class="form-input"
                  :placeholder="$t('business.sloganPlaceholder')"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="goBack"
              class="btn-outline"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="btn-primary"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ $t('business.creating') }}
              </span>
              <span v-else>
                {{ $t('business.createBusiness') }}
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="mt-6 card bg-green-50 border-green-200">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              {{ $t('business.successTitle') }}
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>{{ $t('business.successMessage') }}</p>
            </div>
            <div class="mt-4">
              <button
                @click="goToDashboard"
                class="btn-primary"
              >
                {{ $t('business.goToDashboard') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const isLoading = ref(false)
const success = ref(false)
const errors = ref({})

const form = reactive({
  name: '',
  slug: '',
  phone: '',
  email: '',
  address: '',
  website: '',
  slogan: ''
})

const generateSlug = () => {
  if (form.name && !form.slug) {
    form.slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.name.trim()) {
    errors.value.name = t('business.nameRequired')
  }
  
  if (!form.slug.trim()) {
    errors.value.slug = t('business.slugRequired')
  } else if (!/^[a-z0-9-]+$/.test(form.slug)) {
    errors.value.slug = t('business.slugInvalid')
  }
  
  return Object.keys(errors.value).length === 0
}

const registerBusiness = async () => {
  if (!validateForm()) return
  
  try {
    isLoading.value = true
    errors.value = {}
    
    const businessData = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      address: form.address.trim() || null,
      website: form.website.trim() || null,
      slogan: form.slogan.trim() || null
    }
    
    const tenant = await authStore.registerBusiness(businessData)
    authStore.setCurrentTenant(tenant)
    
    success.value = true
  } catch (error) {
    console.error('Error registering business:', error)
    
    if (error.response?.data?.message) {
      if (error.response.data.message.includes('slug')) {
        errors.value.slug = t('business.slugExists')
      } else {
        errors.value.general = error.response.data.message
      }
    } else {
      errors.value.general = t('business.registerError')
    }
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>
