<template>
  <div class="flex-container">
    <div id="flex-container" class="flex flex-wrap bg-gray-200 m-4 p-2 justify-between">
        <div id="img-name" class="flex flex-wrap">
            <div class="flex border border-2 rounded">
                <img src="{{food.image}}" alt="Food's Picture" class="w-[120px] h-[100px] border-2 border border-black rounded">
            </div>
            <div id="name" class="flex-wrap mt-4">
                <p class="text-2xl mx-4">{{food.name}}</p>
            </div>
        </div>
        <div id="quan" class=" p-2">
            <p class="text-lg text-right">เหลือ : {{food.quantity}}</p>
            <div id="button-flex" class="flex flex-warp">
                <slot name="food_button"></slot>
            </div>
        </div>
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
    }
}   
</script>

<style scoped>
@media (max-width: 455px) {
  #flex-container {
    flex-wrap: nowrap;
    flex-direction: column;
  }
  #img-name{
    flex-direction: column;
    flex-wrap: nowrap;
  }
  #img-name img{
    justify-content: flex-end
  }
  #name{
    flex-wrap: nowrap;
  }
  #button-flex{
    flex-wrap: nowrap;
    justify-content: flex-end
  }
}
</style>