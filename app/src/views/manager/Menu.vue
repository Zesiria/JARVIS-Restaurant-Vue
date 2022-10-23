<template>
  <div id="container">
    <div class="flex flex-col text-2xl text-center my-4">
        <div>
            <button @click="">เช็คบิล</button>
        </div>
        <div>
            <button @click="allFood" class="bg-green-200 rounded my-4 py-2 px-10">ตรวจสอบรายการอาหาร</button>
        </div>
        <div>
            <button @click="addFood">เพิ่มรายการอาหาร</button>
        </div>
        <div>
            <button @click="" class="px-10">รายงานทั้งหมด</button>
        </div>
        <div>
            <button @click="manageTable">เพิ่ม - ลดโต๊ะ</button>
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
    allFood(){
        this.$router.push(`foods`)
    },
    addFood(){
        this.$router.push(`foods/new`)
    },
    manageTable(){
        this.$router.push(`tables`)
    }
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
  width: 300px;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  margin: 10px;
}
</style>