import { defineStore } from 'pinia'
import { customerAPI } from '@/services/api.js'

export const useCustomerStore = defineStore("customers", {
  state: () => {
    return {
        customers: []
    }
  },
  
  getters: {
    getCustomers (state) {
        return state.customers
    },
    getByID : (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    }
  },

  actions: {
    async fetch () {
        this.customers = await customerAPI.getAll()
    },
    async add (customer) {
        const response = await customerAPI.saveNew(customer)
        if (response.success != false) {
          return response.customer_id
        }
	      return false
    },async update (customer) {
      const response = await customerAPI.updateCustomer(customer)
      if (response.success) {
        return true
      }
      return false
    },
    delete (id) {
      this.customers = this.customers.filter(customer => customer.id != id)
    },
  },
})