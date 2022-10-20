<template>
    <div class="flex flex-col text-2xl text-center my-4">
        <div>
            <button @click="orderFood" class="bg-green-200 rounded my-4 py-2 px-10">สั่งอาหาร</button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js"
export default {
    setup() {
    const auth_store = useAuthStore()
    return auth_store
  },
  methods : {
    orderFood(){
        this.$router.push(`/waiter/foods`)
    },
  }
}
</script>