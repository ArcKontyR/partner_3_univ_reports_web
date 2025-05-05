import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import { MaskInput } from 'vue-3-mask'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
    }
  });

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.component('MaskInput', MaskInput);


app.mount('#app')

export default api