import { defineStore } from 'pinia'
import { orderAPI } from '@/services/api.js'

export const useOrderStore = defineStore("orders", {
    state: () => {
        return {
            order: Object,
            orders: [],
            ordersToday:[],
        }
    },

    getters: {
        getOrder (state) {
          return state.order
        },
        getOrders (state) {
            return state.orders
        },
        getOrdersToday (state) {
            return state.ordersToday
            // return state.orders.filter(order => order.status === "PENDING")
        },
        getPendingFoods (state) {
            return state.orders.filter(order => order.status === "PENDING")
        },
        getInProcessFoods (state) {
            return state.orders.filter(order => order.status === "IN PROCESS")
        },
        getCompletedFoods (state) {
            return state.orders.filter(order => order.status === "COMPLETED")
        },
    },

    actions: {
        async fetch () {
            this.orders = await orderAPI.getAll()

        },
        async fetchWithId (id){
            this.order = await orderAPI.getByID(id)
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
        },
        async update (order) {
            const response = await orderAPI.updateOrder(order)
            if (response.success) {
                return true
            }
            return false
        },
        async fetchOrdersToday (){
            this.ordersToday = await orderAPI.getAllOrdersToday()
        },
        delete (id) {
            this.orders = this.orders.filter(order => order.id !== id)
        }
    },
})