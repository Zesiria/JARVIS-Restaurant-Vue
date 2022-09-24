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
    </div>
  </div>

</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      categories: ["เนื้อสัตว์","ผัก","ของทานเล่น"],
      food: {
        name: "",
        type: "",
        quantity: 0,
        image: null
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
          this.$router.push(`/foods`)
        }
      }catch (error) {
        this.error = error.message
        console.log(error)
      }
    }
  }
}
</script>