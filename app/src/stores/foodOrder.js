import {defineStore} from "pinia";
import {foodOrderAPI} from "@/services/api";

export const useFoodOrderStore = defineStore("food-order",{
    id: 'foodOrder',
    state: () => {
        return {
            foodOrders: [],
            foodOrdersTmp: []
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
            console.log(this.foodOrders)
            this.foodOrdersTmp = JSON.parse(localStorage.getItem('foodOrder'))
        },
        async add (order_id){
            // console.log("----")
            // console.log(this.foodOrdersTmp)
            for(let i=0; i<this.foodOrdersTmp.length; i++){
                const foodOrder = this.foodOrdersTmp[i]
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
            this.foodOrdersTmp = JSON.parse(localStorage.getItem('foodOrder'))
            if(this.foodOrdersTmp === null){
                this.foodOrdersTmp = []
            }
            this.foodOrdersTmp.push({
                food: food,
                orderQuantity: qty,
            })
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrdersTmp))
        },
        // deleteFoodOrder (id) {
        //     this.foodOrders = this.foodOrders.filter(foodOrder => foodOrder.food.id != id)
        // },
        updateQuantityFoodOrder(id, qty){
            this.foodOrdersTmp = JSON.parse(localStorage.getItem('foodOrder'))
            const foodOrder = this.foodOrdersTmp.filter(foodOrder => foodOrder.food.id === id)
            foodOrder.quantity = qty
            console.log(foodOrder)
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrdersTmp))
        },
        addQuantityFoodOrder(id, qty){
            this.foodOrdersTmp = JSON.parse(localStorage.getItem('foodOrder'))
            let foodOrder = this.foodOrdersTmp.find(foodOrder => foodOrder.food.id === id)
            foodOrder.orderQuantity = parseInt(foodOrder.orderQuantity) + parseInt(qty)
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrdersTmp))
        },
        getFoodById (id) {
            if(this.foodOrdersTmp === null){
                this.foodOrdersTmp = []
            }
            return this.foodOrdersTmp.filter(foodOrder => foodOrder.food.id === id)
        },
        removeFoodOrder(){
            this.foodOrders = []
            this.foodOrdersTmp = []
            localStorage.removeItem('foodOrder')
        },
    },
})