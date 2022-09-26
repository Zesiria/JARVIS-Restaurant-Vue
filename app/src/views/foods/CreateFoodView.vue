<template>
  <div class="m-8">
    <h1 class="text-3xl">
      เพิ่มรายการอาหาร
    </h1>

    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <!-- input name -->
      <div class="flex flex-col py-2">
        <label for="name"> ชื่อ </label>
        <input type="text" v-model="food.name">
      </div>
      <!-- select type -->
      <div class="flex flex-col w-48 py-2">
        <label for="type"> ประเภท </label>
        <select v-model="food.type">
          <option v-for="category in categories" >
            {{category}}
          </option>
        </select>
      </div>
      <!-- input quantity -->
      <div class="flex flex-col py-2">
        <label for="quantity"> จำนวน </label>
        <input type="number" v-model="food.quantity">
      </div>

      <button @click="saveNewFood"
          class="py-2 px-6 rounded-xl bg-blue-600 text-white mt-2">
        ยืนยัน
      </button>
      <!--<button @click="isOpen = true">open</button>-->

      <!-- Popup -->
      <Popup :open="isOpen">
        <template v-slot:content>
          <div class="text-center font-bold mb-2">
            <h2> เพิ่มรายการอาหารสำเร็จ </h2>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4"> ชื่อ </div>
            <div class="basis-3/4"> {{food.name}} </div>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4"> ประเภท </div>
            <div class="basis-3/4"> {{food.type}} </div>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4"> จำนวน </div>
            <div class="basis-3/4"> {{food.quantity}} </div>
          </div>

          <div class="flex flex-col items-center">
            <button type="button" @click="close"
                    class="py-2 px-6 rounded-xl bg-yellow-300 text-white mt-2">
              ปิด
            </button>
          </div>

        </template>
      </Popup>

    </div>
  </div>

</template>

<script>
import Axios from 'axios'
import Popup from "@/components/foods/Popup.vue"
import {ref} from "vue";

export default {
  setup () {
    const isOpen = ref(false)
    return {isOpen}
  },
  components: {
    Popup
  },
  data() {
    return {
      categories: ["เนื้อสัตว์","ผัก","ของทานเล่น"],
      food: {
        name: "",
        type: "",
        quantity: 0,
        img_path: null
      },
      error: null
    }
  },
  methods: {
    async saveNewFood() {
      const url = 'http://localhost/api/foods'

      try {
        const response = await Axios.post(url, this.food)
        if(response.status == 201){
          this.isOpen = true
        }
      }catch (error) {
        this.error = error.message
        console.log(error)
      }
    },
    async close() {
      this.$router.push(`/foods`)
    }
  }
}
</script>