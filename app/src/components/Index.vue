<script>
import { useFoodStore } from "@/stores/food"
import { useReviewStore } from '@/stores/review'
import FoodList from "@/components/foods/FoodList.vue";

export default {
  setup() {
    const food_store = useFoodStore()
    const review_store = useReviewStore()
    return {food_store, review_store}
  },
  components: {
    FoodList,
  },
  data() {
    return {
      foods: [],
      meat: [],
      vegetable: [],
      appertizer: [],
      reviews : []
    }
  },
  async mounted() {
    await this.food_store.fetch()
    await this.review_store.fetch()
    this.foods = this.food_store.getFoods
    this.meat = this.food_store.getMeatFoods
    this.vegetable = this.food_store.getVegetableFoods
    this.appertizer = this.food_store.getAppertizerFoods
    this.reviews = this.review_store.getReviews
  },
}
</script>

<template>
  <div class="justify-between">
    <div class="p-2 m-2 text-center">
      <h1 class="text-5xl ">Welcome!!</h1>
      <h1 class=""> JARVIS RESTAURANT</h1>
    </div>
  </div>
  <div>
    <div class="menu">
      <div class="w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
        เมนูอาหาร
      </div>
      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        เนื้อสัตว์
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
            <FoodList v-for="food in meat" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
            </FoodList>
        </div>
      </div>

      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        ผัก
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
          <FoodList v-for="food in vegetable" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
          </FoodList>
        </div>
      </div>

      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        ของทานเล่น
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
          <FoodList v-for="food in appertizer" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
          </FoodList>
        </div>
      </div>
    </div>
  </div>
  <div class="">
    <div class="mt-4 w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
      รีวิวจากลูกค้า
    </div>
      <div v-for="review in reviews">
        <div class="mt-3">
          <a class="block p-3 bg-white rounded-lg border border-gray-200 shadow-md  dark:border-gray-700 ">
            <h1 class="flex gap-2 mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m10 12.438 1.271-2.855 2.854-1.271-2.854-1.25L10 4.208 8.729 7.062l-2.833 1.25 2.833 1.271Zm-8.125 5.583V3.5q0-.688.479-1.167.479-.479 1.167-.479h12.958q.688 0 1.167.479.479.479.479 1.167v9.667q0 .687-.479 1.166-.479.479-1.167.479H5.083Zm1.646-3.979.875-.875h12.083V3.5H3.521Zm0-10.542v10.542Z"/></svg>
              รีวิวที่ {{review.review_id}}</h1>
            <p class="font-normal text-gray-700 dark:text-gray-400"> {{ review.description }}</p>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {{ review.updated_at }}</p>
          </a>
        </div>
    </div>
  </div>
</template>