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
            return state.Order
        }
    },

    actions: {
        async fetch () {
            this.Order = await OrderAPI.getAll()
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
        },async update (table) {
            const response = await tableAPI.updateTable(table)
            if (response.success) {
                return true
            }
            return false
        },
        delete (id) {
            this.tables = this.tables.filter(table => table.id != id)
        }
    },
})