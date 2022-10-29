<template>
  <div>
    <div class="flex flex-wrap bg-green-200 border-2 border-black m-4 p-2 justify-between">
      <div class="text-2xl">
        <p >โต๊ะ {{order.table_id}}</p>
        <p>รายการอาหาร {{order.quantity}}</p>
      </div>
      <div>
        <button @click=""
                class="flex py-2 px-6 rounded-full bg-blue-600 text-white mt-3 ">
          รับออเดอร์
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      order: Object,
      url: {
        type: String,
        default: ''
      }
    },
}
</script>