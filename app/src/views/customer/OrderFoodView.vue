<script>
import { useFoodStore } from "@/stores/food";
import {ref} from "vue";
import FoodCard from "@/components/foods/FoodCard.vue";

export default {
  setup() {
    const food_store = useFoodStore()
    return {food_store}
  },
  components: {
    FoodCard
  },
  data() {
    return {
      foods: [],
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น","ของใกล้หมด"],
      selectedType: null,
      selectedFood:[]
    }
  },
  async mounted() {
    await this.food_store.fetch()
    this.foods = this.food_store.getFoods
    this.isOpen = ref(false)
  },
  methods: {
    selectType(type) {
      this.selectedType = type
    },
  },
  watch: {
    async selectedType(newOption, oldOption) {
      await this.food_store.fetch()
      switch (newOption) {
        case 'เนื้อสัตว์':
          this.foods = this.food_store.getMeatFoods
          break
        case 'ผัก':
          this.foods = this.food_store.getVegetableFoods
          break
        case 'ของทานเล่น':
          this.foods = this.food_store.getAppertizerFoods
          break
        case 'ของใกล้หมด':
          this.foods = this.food_store.getLowInStock
          break
        default:
          this.foods = this.foods
          break
      }
    }
  }
}


</script>

<template>
  <p class="text-2xl text-gray-900 dark:text-white"> สั่งอาหาร </p>

  <div>
    <nav class="mx-4">
      <button v-for="category in categories" class="mx-4 my-2 bg-gray-100 w-[100px] border border-2 rounded" @click="selectType(category)">
        {{category}}
      </button>
    </nav>
  </div>

</template>