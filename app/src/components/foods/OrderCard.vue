<template>
  <div @click="clickSelectOrder" class="flex flex-wrap border-b-2 m-4 p-2">
    <div class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      <div class="flex flex-col pb-3">
        <dt class="mb-1 text-sm sm:text-xl">
          รายการที่
          {{this.index}}
        </dt>
        <dt class="lg:text-lg">
          เวลาที่สั่ง
          {{this.order.order_created_at}}
        </dt>
        <div>
          <div class="text-sm lg:text-lg">
            <div v-if="this.status === 'PENDING'" class="flex font-bold text-red-600 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.875 16.5h6.25V14q0-1.375-.896-2.365-.896-.989-2.229-.989-1.333 0-2.229.989-.896.99-.896 2.365ZM10 9.354q1.333 0 2.229-.989.896-.99.896-2.365V3.5h-6.25V6q0 1.375.896 2.365.896.989 2.229.989Zm-5.5 8.229V16.5h1.292V14q0-1.312.687-2.396.688-1.083 1.875-1.604-1.166-.521-1.864-1.604Q5.792 7.312 5.792 6V3.5H4.5V2.417h11V3.5h-1.292V6q0 1.312-.698 2.396-.698 1.083-1.864 1.604 1.187.521 1.875 1.604.687 1.084.687 2.396v2.5H15.5v1.083Z"/></svg>
              รอรับออเดอร์
            </div>
            <div v-if="this.status === 'IN PROCESS'" class="flex font-bold text-yellow-400 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.75 17v-2H2v-1.5h5.75q.604 0 1.052.448.448.448.448 1.052v2Zm3 0v-2q0-.604.438-1.052.437-.448 1.062-.448H18V15h-5.75v2ZM5.5 12.5q-1.062 0-1.781-.719Q3 11.062 3 10V7h14v3q0 1.062-.729 1.781-.729.719-1.771.719Zm0-1.5h9q.417 0 .708-.292.292-.291.292-.708V8.5h-11V10q0 .417.292.708.291.292.708.292ZM3 6V4.5h4.5v-.75q0-.292.208-.521Q7.917 3 8.229 3h3.542q.291 0 .51.229.219.229.219.521v.75H17V6Zm7 3.979Z"/></svg>
              กำลังเตรียม
            </div>

            <div v-if="this.status === 'COMPLETED'" class="flex font-bold text-green-500 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m6.104 14.146-3.542-3.542 1.063-1.062 2.479 2.479 1.063 1.062Zm4.25-.021-3.542-3.521 1.063-1.062 2.479 2.479 6-6.021 1.063 1.062Zm0-4.229L9.292 8.833 12.125 6l1.063 1.062Z"/></svg>
              เสิร์ฟแล้ว
            </div>
          </div>
        </div>
      </div>
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
  },
  data(){
    return{
      status: this.order.status,
    }
  }
}
</script>
