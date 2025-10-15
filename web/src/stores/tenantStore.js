import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTenantStore = defineStore('tenant', () => {
  const currentTenant = ref(null)
  const tenants = ref([])
  const employees = ref([])
  const services = ref([])
  const appointments = ref([])
  
  const setCurrentTenant = (tenant) => {
    currentTenant.value = tenant
  }
  
  const setTenants = (tenantList) => {
    tenants.value = tenantList
  }
  
  const setEmployees = (employeeList) => {
    employees.value = employeeList
  }
  
  const setServices = (serviceList) => {
    services.value = serviceList
  }
  
  const setAppointments = (appointmentList) => {
    appointments.value = appointmentList
  }
  
  const addEmployee = (employee) => {
    employees.value.push(employee)
  }
  
  const updateEmployee = (updatedEmployee) => {
    const index = employees.value.findIndex(emp => emp.id === updatedEmployee.id)
    if (index !== -1) {
      employees.value[index] = updatedEmployee
    }
  }
  
  const removeEmployee = (employeeId) => {
    employees.value = employees.value.filter(emp => emp.id !== employeeId)
  }
  
  const addAppointment = (appointment) => {
    appointments.value.push(appointment)
  }
  
  const updateAppointment = (updatedAppointment) => {
    const index = appointments.value.findIndex(apt => apt.id === updatedAppointment.id)
    if (index !== -1) {
      appointments.value[index] = updatedAppointment
    }
  }
  
  const removeAppointment = (appointmentId) => {
    appointments.value = appointments.value.filter(apt => apt.id !== appointmentId)
  }
  
  return {
    currentTenant,
    tenants,
    employees,
    services,
    appointments,
    setCurrentTenant,
    setTenants,
    setEmployees,
    setServices,
    setAppointments,
    addEmployee,
    updateEmployee,
    removeEmployee,
    addAppointment,
    updateAppointment,
    removeAppointment
  }
})
