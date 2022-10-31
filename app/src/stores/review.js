import { defineStore } from 'pinia'
import { reviewAPI } from '@/services/api.js'

export const useReviewStore = defineStore("reviews", {
  state: () => {
    return {
        reviews: []
    }
  },
  
  getters: {
    getReviews (state) {
        return state.reviews
    }
  },

  actions: {
    async fetch () {
        this.reviews = await reviewAPI.getAll()
    },
    async add (review) {
        const response = await reviewAPI.saveNew(review)
        if (response.success) {
          this.reviews.push({
            ...review
          })
          return response.data
        }
	      return false
    }
  },
})