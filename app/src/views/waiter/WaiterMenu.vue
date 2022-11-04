<template>
  <div  id="container">
    <div class="flex flex-col text-2xl text-center my-4">
      <div>
            <button @click="orderFood" class="bg-green-200 rounded my-4 py-2 px-10">สั่งอาหาร</button>
        </div>
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

<style scoped>
#container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
button{
  background-color: #1554F6;
  border-radius: 20px;
  color: #FFFFFF;
  width: 150px;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  margin: 10px;
}
</style>
