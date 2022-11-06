import { defineStore } from 'pinia'
import { userAPI } from '@/services/api.js'

export const useUserStore = defineStore("users", {
  state: () => {
    return {
        users: []
    }
  },
  
  getters: {
    getUsers (state) {
        return state.users
    }
  },

  actions: {
    async fetch () {
        this.users = await userAPI.getUsers()
    },
    async add (user) {
        const response = await userAPI.saveNewUser(user)
        if (response.success) {
          this.users.push({
            ...user
          })
          return response
        }
	      return false
    },async update (id, user) {
      const response = await userAPI.updateUser(id, user)
      if (response.success) {
        return true
      }
      return false
  },
    async delete (id) {
        const response = await userAPI.deleteUser(id)
        if (response.success) {
          return true
        }
        return false
    },
    async changePassword(user){
      const response = await userAPI.updatePassword(user)
      if (response.success) {
        return response
      }
      return false
    }
  },
})