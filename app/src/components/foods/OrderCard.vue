<template>
  <div @click="clickSelectOrder" class="flex flex-wrap border-b-2 m-4 p-2">
  <div class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col pb-3">
      <dt class="mb-1 text-sm sm:text-xl">
        รายการที่
        {{this.index}}
      </dt>
      <dt class="text-sm lg:text-lg">
        เวลาที่สั่ง
        {{this.order.order_created_at}}
      </dt>
      <dd class="text-sm font-semibold lg:text-lg">
        {{this.thaiStatus[order.status]}}</dd>
    </div>
  </div>
  </div>

<!--  <div @click="clickSelectOrder"-->
<!--      class="flex flex-wrap bg-gray-200 m-4 p-2">-->
<!--    <div>-->
<!--      order ที่-->
<!--      {{this.index}}-->
<!--    </div>-->
<!--    <div>-->
<!--      เวลา-->
<!--      {{this.order.order_created_at}}-->
<!--    </div>-->
<!--    <div>-->
<!--      สถานะ-->
<!--      {{this.thaiStatus[order.status]}}-->
<!--    </div>-->

<!--  </div>-->
</template>

<script>
export default {
  props: {
    order: Object,
    index: 0,
  },
  methods: {
    //
  },
  data(){
    return{
      status: this.order.status,
      thaiStatus: {'PENDING': 'รอรับออเดอร์', 'IN PROCESS': 'กำลังเตรียม', 'COMPLETED': 'เสร็จสิ้น'}
    }
  }
}
</script>
