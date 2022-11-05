<template>
  <div class="flex shrink-0 ">
    <div class="justify-center text-center">
      <div class=" flex justify-center">
      <img class="m-1 bg-blue-200 w-10 h-10 rounded-full " :src="this.food.img_path" >
      </div>
      <p class="text-base sm:text-xs sm:font-light md:text-md lg:text-lg max-w-full p-2 text-gray-900">
        {{food.name}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
    url: {
      type: String,
      default: ''
    }
  },
}
</script>