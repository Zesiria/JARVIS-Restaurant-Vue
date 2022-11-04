<template>

  <div v-if="auth && auth.email" class="pt-2">
    <div class="flex justify-center">
    <div class="flex flex-wrap gap-2 p-2 max-w-sm bg-white rounded-full border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.025 17.3Q7.3 16.35 8.8 15.8t3.2-.55q1.7 0 3.2.55 1.5.55 2.775 1.5.925-1.025 1.475-2.375T20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.575.55 2.925.55 1.35 1.475 2.375ZM12 12.75q-1.375 0-2.312-.938-.938-.937-.938-2.312 0-1.375.938-2.312.937-.938 2.312-.938 1.375 0 2.312.938.938.937.938 2.312 0 1.375-.938 2.312-.937.938-2.312.938Zm0 8.75q-1.975 0-3.712-.75Q6.55 20 5.275 18.725T3.25 15.712Q2.5 13.975 2.5 12t.75-3.713Q4 6.55 5.275 5.275T8.288 3.25Q10.025 2.5 12 2.5t3.713.75q1.737.75 3.012 2.025t2.025 3.012q.75 1.738.75 3.713t-.75 3.712q-.75 1.738-2.025 3.013t-3.012 2.025q-1.738.75-3.713.75Zm0-1.5q1.35 0 2.613-.438 1.262-.437 2.237-1.212-.975-.75-2.213-1.175Q13.4 16.75 12 16.75t-2.637.413q-1.238.412-2.213 1.187.975.775 2.237 1.212Q10.65 20 12 20Zm0-8.75q.75 0 1.25-.5t.5-1.25q0-.75-.5-1.25T12 7.75q-.75 0-1.25.5t-.5 1.25q0 .75.5 1.25t1.25.5Zm0-1.75Zm0 8.875Z"/></svg>
      {{ auth.email }}
      <router-link to="/logout"><button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py- px-2 rounded">
        <span class="glyphicon glyphicon-log-out"></span> ออกจากระบบ
      </button>
      </router-link>
    </div>
    </div>
  </div>

  <div v-else-if="auth && auth.role === 'customer'">
    <div class="flex justify-center">
      <div class="flex flex-wrap gap-2 p-2 max-w-sm bg-white rounded-full border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.025 17.3Q7.3 16.35 8.8 15.8t3.2-.55q1.7 0 3.2.55 1.5.55 2.775 1.5.925-1.025 1.475-2.375T20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.575.55 2.925.55 1.35 1.475 2.375ZM12 12.75q-1.375 0-2.312-.938-.938-.937-.938-2.312 0-1.375.938-2.312.937-.938 2.312-.938 1.375 0 2.312.938.938.937.938 2.312 0 1.375-.938 2.312-.937.938-2.312.938Zm0 8.75q-1.975 0-3.712-.75Q6.55 20 5.275 18.725T3.25 15.712Q2.5 13.975 2.5 12t.75-3.713Q4 6.55 5.275 5.275T8.288 3.25Q10.025 2.5 12 2.5t3.713.75q1.737.75 3.012 2.025t2.025 3.012q.75 1.738.75 3.713t-.75 3.712q-.75 1.738-2.025 3.013t-3.012 2.025q-1.738.75-3.713.75Zm0-1.5q1.35 0 2.613-.438 1.262-.437 2.237-1.212-.975-.75-2.213-1.175Q13.4 16.75 12 16.75t-2.637.413q-1.238.412-2.213 1.187.975.775 2.237 1.212Q10.65 20 12 20Zm0-8.75q.75 0 1.25-.5t.5-1.25q0-.75-.5-1.25T12 7.75q-.75 0-1.25.5t-.5 1.25q0 .75.5 1.25t1.25.5Zm0-1.75Zm0 8.875Z"/></svg>
        ยินดีต้อนรับ
        <router-link to="/logout"><button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py- px-2 rounded">
          <span class="glyphicon glyphicon-log-out"></span> ออกจากระบบ
        </button>
        </router-link>
      </div>
    </div>

  </div>

  <div v-else>
    <div class="justify-center px-2 py-2 bg-blue-100 text-base text-blue-700 inline-flex items-center w-full" role="alert">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
      </svg>
      โปรดเข้าสู่ระบบก่อนใช้งาน
    </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      auth: null
    }
  },
  watch: {
    auth_store: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue.getAuth)
        this.auth = this.auth_store.getAuth
      }
    }
  },
  mounted() {
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }

  }
}
</script>