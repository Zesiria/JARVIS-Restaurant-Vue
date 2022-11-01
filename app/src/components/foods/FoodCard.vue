<template>
  <div>
    <div id="flex-container" class="flex flex-wrap bg-gray-200 m-4 p-2 justify-between rounded-lg rounded-lg border border-gray-200 shadow-md ">
        <div id="img-name" class="flex flex-wrap">
            <div class="flex border border-2 rounded">
                <img :src="this.food.img_path" alt="Foods Picture" class="w-[120px] h-[100px] border-2 border border-black rounded">
            </div>
            <div id="name" class="flex-wrap mt-4">
                <p class="text-2xl mx-4">{{food.name}}</p>
            </div>
        </div>
        <div id="quan" class=" p-2">
            <p class="text-lg text-right">เหลือ : {{food.quantity}}</p>
            <div id="button-flex" class="flex flex-warp">
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
@media (max-width: 480px) {

  #flex-container {
    /*width: fit-content;*/
    flex-wrap: nowrap;
    flex-direction: column;
  }
  #img-name{
    flex-wrap: nowrap;
    /*align-content: flex-start;*/
    /*align-items: flex-start;*/
    /*flex-direction: column;*/

    /*justify-content: center;*/
    margin: 0;
    padding: 0;
  }
  #img-name img{
    width: 60px;
    height: 60px;
  }
  /*#name{*/
  /*  flex-wrap: nowrap;*/
  /*}*/
  #quan{
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    /*flex-direction: column;*/
  }
  #quan p{
    font-size: 17px;
  }
  #name{
    margin: 0px;
  }
  #name p{
    flex-wrap: nowrap;
    font-size: 20px;
    width: 150px;
    /*font-weight: bold;*/
  }
}
</style>