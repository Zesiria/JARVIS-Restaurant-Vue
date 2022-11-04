<template>
  <div id="button-dropdown" class="dropdown">
    <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
    <ul class="dropdown-menu">
      <RouterLink to="/foods"><li><a class="dropdown-item">เมนูอาหาร</a></li></RouterLink>
      <RouterLink to="/order/view"  v-if="auth && auth.role === 'customer'"><li><a class="dropdown-item">ประวัติการสั่งอาหาร</a></li></RouterLink>
      <RouterLink to="" v-if="auth && auth.role === 'customer'"><li><a class="dropdown-item">ค่าใช้จ่าย</a ></li></RouterLink>
      <RouterLink to="/customer/review"  v-if="auth && auth.role === 'customer'"><li><a class="dropdown-item">แสดงความคิดเห็น</a></li></RouterLink>
      <RouterLink to="/manager/bill/check"  v-if="auth && auth.role === 'Manager'"><li><a class="dropdown-item">เช็คบิล</a></li></RouterLink>
      <RouterLink to="/foods"  v-if="auth && auth.role === 'Manager'"><li><a class="dropdown-item">ตรวจสอบรายการอาหาร</a></li></RouterLink>
      <RouterLink to="/foods/new"  v-if="auth && auth.role === 'Manager'"><li><a class="dropdown-item">เพิ่มรายการอาหาร</a></li></RouterLink>
      <RouterLink to="/manager/report"  v-if="auth && auth.role === 'Manager'"><li><a class="dropdown-item">รายงานการขายทั้งหมด</a></li></RouterLink>
      <RouterLink to="/manager/tables"  v-if="auth && auth.role === 'Manager'"><li><a class="dropdown-item">รายการโต๊ะทั้งหมด</a></li></RouterLink>

    </ul>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      auth: null,

    }
  },
  async mounted() {
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
      console.log(this.auth)
    } else {
      this.auth = null
    }
  },
  auth_store: {
    immediate: true,
    deep: true,
    handler(newValue, oldValue) {
      console.log(newValue.getAuth)
      this.auth = this.auth_store.getAuth
    }
  }
}
</script>