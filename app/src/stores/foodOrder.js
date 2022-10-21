import {defineStore} from "pinia";
import {foodOrderAPI} from "@/services/api";

export const useFoodOrderStore = defineStore("food-order",{
    id: 'foodOrder',
    state: () => {
        return {
            foodOrders: []
        }
    },

    getters: {
        getFoodOrders (state) {
            return state.foodOrders
        },
    },
    actions: {
        async fetch () {
            this.foodOrders = JSON.parse(localStorage.getItem('foodOrder'))
        },
        async add (order_id){
            if(this.foodOrders === null ) return
            for(let i=0; i<this.foodOrders.length; i++){
                const foodOrder = this.foodOrders[i]
                const foodOrder_new = {
                    "order_id": order_id,
                    "food_id": foodOrder.food.id,
                    "quantity": foodOrder.orderQuantity
                }
                console.log(foodOrder_new)
                const response = await foodOrderAPI.saveNewFoodOrder(foodOrder_new)
            }
            this.removeFoodOrder()
            return false
        },
        async addFoodOrder (food, qty) {
            this.foodOrders = JSON.parse(localStorage.getItem('foodOrder'))
            if(this.foodOrders === null){
                this.foodOrders = []
            }
            this.foodOrders.push({
                food: food,
                orderQuantity: qty,
            })
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrders))
        },
        // deleteFoodOrder (id) {
        //     this.foodOrders = this.foodOrders.filter(foodOrder => foodOrder.food.id != id)
        // },
        async updateQuantityFoodOrder(id, qty){
            this.foodOrders = JSON.parse(localStorage.getItem('foodOrder'))
            let foodOrder = this.foodOrders.filter(foodOrder => foodOrder.food.id === id)
            foodOrder[0].orderQuantity = qty
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrders))
        },
        addQuantityFoodOrder(id, qty){
            this.foodOrders = JSON.parse(localStorage.getItem('foodOrder'))
            let foodOrder = this.foodOrders.find(foodOrder => foodOrder.food.id === id)
            foodOrder.orderQuantity = parseInt(foodOrder.orderQuantity) + parseInt(qty)
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrders))
        },
        getFoodById (id) {
            if(this.foodOrders === null){
                this.foodOrders = []
            }
            return this.foodOrders.filter(foodOrder => foodOrder.food.id === id)
        },
        removeFoodOrder(){
            this.foodOrders = []
            localStorage.removeItem('foodOrder')
        },
    },
})