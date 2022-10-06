import { defineStore } from 'pinia'
import { foodAPI } from '@/services/api.js'

export const useFoodStore = defineStore("foods", {
  state: () => {
    return {
        foods: []
    }
  },
  
  getters: {
    getFoods (state) {
        return state.foods
    },
	sortByName (state) {
		const sortable = [...state.foods]
		return sortable.sort((a, b) => {
            return (a.name).localeCompare(b.name)
        })
    }
  },

  actions: {
    async fetch () {
        this.foods = await foodAPI.getAll()
    },
    async add (food) {
        const response = await foodAPI.saveNew(food)
        if (response.success) {
          this.foods.push({
            ...food
          })
          return response.food_id
        }
	      return false
    },
    delete (id) {
      this.foods = this.foods.filter(food => food.id != id)
    }
  },
})