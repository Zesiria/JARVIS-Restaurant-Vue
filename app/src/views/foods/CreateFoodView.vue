<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <div class="title-page">
        เพิ่มรายการอาหาร
      </div>
      <div class=" shadow rounded m-10">
      <div class="flex justify-center ">
      <!-- input name -->
      <div>
      <div class="flex flex-col py-2 mt-5 w-auto">
        <label for="name"> ชื่อ </label>
        <input type="text" v-model="this.inputName" required>
      </div>
      <!-- select type -->
      <div class="flex flex-col w-auto py-2">
        <label for="type"> หมวดหมู่อาหาร </label>
        <select class="rounded-lg" v-model="this.inputType">
          <option v-for="category in categories" >
            {{category}}
          </option>
        </select>
      </div>
      <!-- input quantity -->
      <div class="flex flex-col py-2 w-20">
        <label for="quantity"> จำนวน </label>
        <input type="number" v-model="this.inputQuantity" required>
      </div>

      <div>
        <label class="col-md-4 col-form-label text-md-right">รูปภาพ</label>
        <div class="col-md-6 mt-2">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" 
                ref="file" @change="handleFileObject()">
            <label class="custom-file-label text-left" for="customFile">{{}}</label>
          </div>
        </div>
      </div>
        <div class="flex justify-center mb-5">
      <button @click="saveNewFood"
          class="py-2 px-6 rounded-xl bg-blue-600 text-white mt-3 hover:caret-blue-600">
        ยืนยัน
      </button>
        </div>
      </div>
      </div>

      <!-- Popup -->
      <Popup :open="isOpen">
        <template v-slot:header>
          เพิ่มรายการอาหารสำเร็จ
        </template>

        <template v-slot:content>
          <div class="flex flex-row">
            <div class="basis-1/4"> ชื่อ </div>
            <div class="basis-3/4"> {{inputName}} </div>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4"> ประเภท </div>
            <div class="basis-3/4"> {{inputType}} </div>
          </div>

          <div class="flex flex-row">
            <div class="basis-1/4"> จำนวน </div>
            <div class="basis-3/4"> {{inputQuantity}} </div>
          </div>

        </template>

        <template v-slot:footer>
          <button data-modal-toggle="defaultModal" type="button" @click="backToHomePage" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            หน้าหลัก
          </button>
          <button data-modal-toggle="defaultModal" type="button" @click="close" class="bg-gray-200 border border-blue-700 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            ปิด
          </button>
        </template>
      </Popup>
      </div>
  </div>
  </div>
  </template>

<script>
import Popup from "@/components/foods/Popup.vue"
import {ref} from "vue"
import axios from 'axios'
import {useFoodStore} from "@/stores/food";
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
  setup () {
    const isOpen = ref(false)
    const food_store = new useFoodStore()
    return {isOpen, food_store}
  },
  components: {
    Popup,
    HamburgerMenu
  },
  data() {
    return {
      categories: ["เนื้อสัตว์","ผัก","ของทานเล่น"],
      inputName:"",
      inputQuantity: 1,
      inputType: "",
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
      await this.uploadImage()
      this.food.name = this.inputName,
      this.food.type = this.inputType
      this.food.quantity = this.inputQuantity
      if(this.inputType == "เนื้อสัตว์"){this.food.type = "meat"}
      else if(this.inputType == "ผัก"){this.food.type = "vegetable"}
      else if(this.inputType == "ของทานเล่น"){this.food.type = "appetizer"}
      try {
        this.food_store.add(this.food).then(res => {
          this.isOpen = true
        })
      }catch (error) {
        this.error = error.message
        console.log(error)
      }
    },
    async close() {
      this.food = {
        name: "",
        type: "",
        quantity: 0,
        img_path: ""
      }
      this.inputName = ""
      this.inputQuantity = ""
      this.food.img_path = null
      this.error = null
      this.isOpen = false
    },
    backToHomePage() {
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
  },
  watch:{
    inputQuantity(newOption, oldOption){
      if(newOption <= 0){
          this.inputQuantity = 1
      }
    }
  }
}
</script>

<style scoped>
input{
  border-radius: 10px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

