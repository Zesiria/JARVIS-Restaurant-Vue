<template>
    <div class="flex flex-col text-2xl text-center my-4">
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">เช็คบิล</button>
        </div>
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">เปิดโต๊ะ</button>
        </div>
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">ตรวจสอบรายการอาหาร</button>
        </div>
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">เพิ่มรายการอาหาร</button>
        </div>
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">รายงานทั้งหมด</button>
        </div>
        <div>
            <button @click="" class="bg-green-200 rounded my-4 py-2 px-10">เพิ่ม - ลดโต๊ะ</button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js"
export default {
    setup() {
    const auth_store = useAuthStore()
    return auth_store
  }
}
</script>