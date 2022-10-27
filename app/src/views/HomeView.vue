<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
    <div class="p-2 justify-between bg-[#080039]  text-white ">
      <RouterLink to="/customer/login"  class="float-right underline" >เข้าสู่ระบบ</RouterLink>
      <div class="p-5 m-4 text-center">
        <h1 class="text-5xl ">Welcome!!</h1>
        <h1 class=""> JARVIS RESTAURANT</h1>
      </div>
    </div>

    <div>
      <div class="text-center p-2 bg-gray-100">
        <div class="flex justify-center">
          <div class="mt-2 w-[150px] text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
            เมนูแนะนำ
          </div>
        </div>
        <div class="flex justify-center ">
          <div class="bg-gray-200  flex-row justify-center m-3 p-2 rounded-lg">
            <p>เนื้อ Premium</p>
            <img src="{{food.image}}" alt="Food's Picture" class="mt-2 h-20 w-full object-cover md:w-20 border-2 border border-black rounded  ">
          </div>
          <div class="bg-gray-200  flex-row justify-center m-3 p-2 rounded-lg">
            <p>เนื้อ Premium</p>
            <img src="{{food.image}}" alt="Food's Picture" class="mt-2 h-20 w-full object-cover md:w-20 border-2 border border-black rounded  ">
          </div>
          <div class="bg-gray-200  flex-row justify-center m-3 p-2 rounded-lg">
            <p>เนื้อ Premium</p>
            <img src="{{food.image}}" alt="Food's Picture" class="mt-2 h-20 w-full object-cover md:w-20 border-2 border border-black rounded  ">
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 text-center bg-gray-100">
      <div class="flex justify-center">
        <div class=" w-[150px] text-white bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
          รีวิวจากลูกค้า
        </div>
      </div>
      <div class="flex mt-3 justify-center content-center">
        <a class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  dark:border-gray-700 ">
          <h class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">วันที่ 26/10/2022 เวลา 12.00</h>
          <p class="font-normal text-gray-700 dark:text-gray-400">อาหารอร่อยมาก คุ้มค้ากับราคา พนักงานน่ารัก </p>
        </a>
      </div>
    </div>
  </div>
  <!--    <TheWelcome />-->
</template>