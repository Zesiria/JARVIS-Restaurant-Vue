import { defineStore } from 'pinia'
import { orderAPI } from '@/services/api.js'

export const useOrderStore = defineStore("orders", {
    state: () => {
        return {
            orders: []
        }
    },

    getters: {
        getOrders (state) {
            return state.orders
        }
    },

    actions: {
        async fetch () {
            this.orders = await orderAPI.getAll()
        },
        async add (order) {
            const response = await orderAPI.saveNew(order)
            if (response.success) {
                this.orders.push({
                    ...order
                })
                return response.order_id
            }
            return false
        },async update (order) {
            const response = await orderAPI.updateOrder(order)
            if (response.success) {
                return true
            }
            return false
        },
        delete (id) {
            this.orders = this.orders.filter(order => order.id !== id)
        }
    },
})