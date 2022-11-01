import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/index.css'
import 'flowbite';

const app = createApp(App)

app.use(createPinia())
app.use(router)

const axiosInstance = axios.create({
    baseURL: 'http://localhost/api'
})

app.config.globalProperties.$axios = {...axiosInstance}

app.mount('#app')
