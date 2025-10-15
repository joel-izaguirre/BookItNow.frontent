import apiClient from './api'

export const authService = {
  async registerBusiness(businessData) {
    const response = await apiClient.post('/auth/register', businessData)
    return response.data
  },
  
  async getCurrentUser() {
    const response = await apiClient.get('/users/profile')
    return response.data
  },
  
  async updateProfile(userData) {
    const response = await apiClient.put('/users/profile', userData)
    return response.data
  },
  
  async getUserTenants() {
    const response = await apiClient.get('/users/tenants')
    return response.data
  }
}

export const tenantService = {
  async createTenant(tenantData) {
    const response = await apiClient.post('/tenants', tenantData)
    return response.data
  },
  
  async getTenantBySlug(slug) {
    const response = await apiClient.get(`/tenants/${slug}`)
    return response.data
  },
  
  async updateTenant(tenantId, tenantData) {
    const response = await apiClient.put(`/tenants/${tenantId}`, tenantData)
    return response.data
  },
  
  async inviteEmployee(tenantId, employeeData) {
    const response = await apiClient.post(`/tenants/${tenantId}/invite`, employeeData)
    return response.data
  },
  
  async changeUserRole(tenantId, userId, role) {
    const response = await apiClient.put(`/tenants/${tenantId}/users/${userId}/role`, { role })
    return response.data
  },
  
  async transferOwnership(tenantId, newOwnerId) {
    const response = await apiClient.post(`/tenants/${tenantId}/transfer`, { newOwnerId })
    return response.data
  }
}

export const employeeService = {
  async getTenantEmployees(tenantId) {
    const response = await apiClient.get(`/tenants/${tenantId}/employees`)
    return response.data
  },
  
  async addEmployee(tenantId, employeeData) {
    const response = await apiClient.post(`/tenants/${tenantId}/employees`, employeeData)
    return response.data
  },
  
  async updateEmployeeAvailability(employeeId, availability) {
    const response = await apiClient.put(`/employees/${employeeId}/availability`, availability)
    return response.data
  },
  
  async uploadPortfolioImage(employeeId, imageData) {
    const response = await apiClient.post(`/employees/${employeeId}/portfolio`, imageData)
    return response.data
  },
  
  async updateOverlapRules(employeeId, rules) {
    const response = await apiClient.put(`/employees/${employeeId}/overlap-rules`, rules)
    return response.data
  }
}

export const appointmentService = {
  async getTenantAvailability(tenantId, startDate, endDate) {
    const response = await apiClient.get(`/tenants/${tenantId}/availability`, {
      params: { startDate, endDate }
    })
    return response.data
  },
  
  async getEmployeeAvailability(tenantId, employeeId, startDate, endDate) {
    const response = await apiClient.get(`/tenants/${tenantId}/employees/${employeeId}/availability`, {
      params: { startDate, endDate }
    })
    return response.data
  },
  
  async createAppointment(appointmentData) {
    const response = await apiClient.post('/appointments', appointmentData)
    return response.data
  },
  
  async getAppointments(filters = {}) {
    const response = await apiClient.get('/appointments', { params: filters })
    return response.data
  },
  
  async updateAppointmentStatus(appointmentId, status) {
    const response = await apiClient.put(`/appointments/${appointmentId}/status`, { status })
    return response.data
  },
  
  async deleteAppointment(appointmentId) {
    const response = await apiClient.delete(`/appointments/${appointmentId}`)
    return response.data
  }
}

export const favoritesService = {
  async getFavoriteBusinesses() {
    const response = await apiClient.get('/users/favorites/businesses')
    return response.data
  },
  
  async addFavoriteBusiness(tenantId) {
    const response = await apiClient.post(`/users/favorites/businesses/${tenantId}`)
    return response.data
  },
  
  async removeFavoriteBusiness(tenantId) {
    const response = await apiClient.delete(`/users/favorites/businesses/${tenantId}`)
    return response.data
  },
  
  async getFavoriteEmployees() {
    const response = await apiClient.get('/users/favorites/employees')
    return response.data
  },
  
  async addFavoriteEmployee(employeeId) {
    const response = await apiClient.post(`/users/favorites/employees/${employeeId}`)
    return response.data
  },
  
  async removeFavoriteEmployee(employeeId) {
    const response = await apiClient.delete(`/users/favorites/employees/${employeeId}`)
    return response.data
  }
}

export const subscriptionService = {
  async getSubscriptionPlans() {
    const response = await apiClient.get('/subscriptions/plans')
    return response.data
  },
  
  async getTenantSubscription(tenantId) {
    const response = await apiClient.get(`/tenants/${tenantId}/subscription`)
    return response.data
  },
  
  async upgradeSubscription(tenantId, planData) {
    const response = await apiClient.post('/subscriptions/upgrade', { tenantId, ...planData })
    return response.data
  },
  
  async downgradeSubscription(tenantId) {
    const response = await apiClient.post('/subscriptions/downgrade', { tenantId })
    return response.data
  },
  
  async updatePaymentMethod(tenantId, paymentMethodData) {
    const response = await apiClient.post('/subscriptions/payment-method', { tenantId, ...paymentMethodData })
    return response.data
  },
  
  async getBillingHistory(tenantId) {
    const response = await apiClient.get('/subscriptions/invoices', { params: { tenantId } })
    return response.data
  }
}

