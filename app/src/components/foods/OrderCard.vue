<template>
  <div @click="clickSelectOrder"
      class="flex flex-wrap bg-gray-200 m-4 p-2 justify-between">
    <div>
      order ที่
      {{this.index}}
    </div>
    <div>
      เวลา
      {{this.order.order_created_at}}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    index: 0,
  },
  methods: {
    //
  }
}
</script>
