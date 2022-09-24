<script>
export default {
    data(){
        return {
            foods : [],
            categories: ["ทั้งหมด","เนื้อสัตว์","ผัก","ของทานเล่น"],
            selectedType : null,
            showFoods: null
        }
    }, async mounted() {
        try{
            const response = await this.$axios.get("/foods")
            this.foods = response.data
        } catch (error) {
            console.log(error.message)
        }
        this.showFoods = this.foods
    }, methods:{
        selectType(type){
            this.selectedType = type
            console.log(this.selectedType)
        }
    }, watch: {
        selectedType(newOption, oldOption){
            switch (newOption) {
                case 'เนื้อสัตว์':
                    this.showFoods = this.foods.filter(food => food.type === "เนื้อสัตว์")
                    break
                case 'ผัก':
                    this.showFoods = this.foods.filter(food => food.type === "ผัก")
                    break
                case 'ของทานเล่น':
                    this.showFoods = this.foods.filter(food => food.type === "ของทานเล่น")
                    break
                default:
                    this.showFoods = this.foods
                    break    
            }
        }
    }
}
</script>

<template>
    <div>
        <h1 class="text-3xl">
            เมนูอาหาร
        </h1>
    </div>
    <div>
        <nav class="mx-4">
            <button v-for="category in categories" class="mx-4 my-2 bg-gray-100 w-[100px] border border-2 rounded" @click="selectType(category)">
                {{category}}
            </button>
        </nav>
    </div>
    <div>
        <div v-for="food in showFoods" :key="food.id">
            <div class="flex flex-wrap bg-gray-200 m-4 p-2">
                <div class="border border-2 rounded">
                    <img src="{{food.image}}" alt="Food's Picture" class="w-[120px] h-[100px] border-2 border border-black rounded">
                </div>
                <div class="flex flex-col mt-4">
                    <p class="text-2xl mx-4">{{food.name}}</p>
                    <p class="text-lg mx-4">เหลือ : {{food.quantity}}</p>
                </div>
            </div>
        </div>
    </div>
</template>