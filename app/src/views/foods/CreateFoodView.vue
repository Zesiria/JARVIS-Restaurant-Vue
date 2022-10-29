<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <h1 class="text-3xl">
        เพิ่มรายการอาหาร
      </h1>
      <!-- input name -->
      <div class="flex flex-col py-2 mt-10">
        <label for="name"> ชื่อ </label>
        <input type="text" v-model="food.name">
      </div>
      <!-- select type -->
      <div class="flex flex-col w-48 py-2">
        <label for="type"> หมวดหมู่อาหาร </label>
        <select class="rounded-lg" v-model="food.type">
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

      <div>
        <label class="col-md-4 col-form-label text-md-right">รูปภาพ</label>
        <div class="col-md-6">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" 
                ref="file" @change="handleFileObject()">
            <label class="custom-file-label text-left" for="customFile">{{}}</label>
          </div>
        </div>
      </div>

      <button @click="saveNewFood"
          class="py-2 px-6 rounded-xl bg-blue-600 text-white mt-5 float-right">
        ยืนยัน
      </button>
      <!--<button @click="isOpen = true">open</button>-->

      <!-- Popup -->
      <Popup :open="isOpen">
        <template v-slot:header>
          เพิ่มรายการอาหารสำเร็จ
        </template>

        <template v-slot:content>
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

        </template>

        <template v-slot:footer>
          <button data-modal-toggle="defaultModal" type="button" @click="close" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            ปิด
          </button>
        </template>

      </Popup>
      

      <button @click="debug()">Debug Button</button>
    </div>
  </div>
  
  </template>

<script>
import Axios from 'axios'
import Popup from "@/components/foods/Popup.vue"
import {ref} from "vue"
import axios from 'axios'

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
        img_path: ""
      },
      imageData: null,
      error: null
    }
  },
  methods: {
    async saveNewFood() {
      const url = 'http://localhost/api/foods'
      await this.uploadImage()
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
    },
    async uploadImage(){
      let formData = new FormData()
      formData.append('image', this.imageData)

      const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
      const respone = await axios.post('http://localhost/api/image-upload', formData, config)
      this.food.img_path = respone.data.path
    },
    handleFileObject() {
      this.imageData = this.$refs.file.files[0]
    },
    debug(){
      this.uploadImage()
    }
  }
}
</script>

<style scoped>
input{
  border-radius: 10px;
}
</style>

