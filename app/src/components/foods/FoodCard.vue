<template>
  <div>
    <div id="flex-container" class="flex flex-wrap bg-gray-200 m-4 p-2 justify-between rounded-lg border border-gray-200 shadow-md ">
      <div class="">
        <div id="img-name" class="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <img :src="food.img_path" alt="Foods Picture" class="w-[120px] h-[100px] border-2 border border-black rounded">
                  <p class="text-2xl">{{food.name}}</p>
          </div>
      </div>
        <div id="quan" class=" p-2">
            <p class="text-lg text-right">เหลือ : {{food.quantity}}</p>
            <div id="button-flex" class="flex flex-warp sm:flex-row">
                <slot name="food_button"></slot>
                <slot name="quantity_food_order"></slot>
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
@media (max-width: 640px) {

  #flex-container {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  #img-name {
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;

  }
  #img-name p{
    font-size: 17px;
    margin-left: 0;
  }
  #img-name img{
    width: 64px;
    height: 64px;
    overflow: hidden;
    text-align: center;  }
  #button-flex {
    justify-content: center;
  }
  #quan p {
    font-size: 14px;
    text-align: center;
    justify-content: center;
    justify-items: center;
  }
}
</style>