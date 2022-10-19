import {defineStore} from "pinia";
import {foodOrderAPI} from "@/services/api";

const food_order_storage = {
    foodOrder: JSON.parse(localStorage.getItem('foodOrder'))
}

export const useFoodOrderStore = defineStore("food-order",{
    state: () => {
        return {
            foodOrders: food_order_storage.foodOrder,
            foodOrdersTmp: []
        }
    },

    getters: {
        getFoodOrder (state) {
            return state.foodOrders
        },
    },
    actions: {
        async fetch () {
            this.foodOrders = food_order_storage.foodOrder
            this.foodOrdersTmp = food_order_storage.foodOrder
        },
        async add (order_id){
            this.foodOrdersTmp = food_order_storage.foodOrder
            console.log("----")
            console.log(this.foodOrdersTmp)
            for(let i=0; i<this.foodOrdersTmp.length; i++){
                const foodOrder = this.foodOrdersTmp[i]
                const foodOrder_new = {
                    "order_id": order_id,
                    "food_id": foodOrder.food.id,
                    "quantity": foodOrder.orderQuantity
                }
                console.log(foodOrder_new)
                const response = await foodOrderAPI.saveNewFoodOrder(foodOrder_new)
                if (response.success) {
                    this.removeFoodOrder()
                    return true
                }
                this.removeFoodOrder()
                return false
            }
        },
        async addFoodOrder (food, qty) {
            this.foodOrdersTmp = food_order_storage.foodOrder
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
            this.foodOrdersTmp = food_order_storage.foodOrder
            const foodOrder = this.foodOrdersTmp.filter(foodOrder => foodOrder.food.id === id)
            foodOrder.quantity = qty
            console.log(foodOrder)
            localStorage.setItem('foodOrder', JSON.stringify(this.foodOrdersTmp))
        },
        addQuantityFoodOrder(id, qty){
            this.foodOrdersTmp = food_order_storage.foodOrder
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
            localStorage.removeItem('foodOrder')
        },
    },
})