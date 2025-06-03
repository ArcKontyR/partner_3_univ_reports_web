import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import PrimeVue from 'primevue/config';
import InputMask from 'primevue/inputmask';
import { usePassThrough } from 'primevue/passthrough'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
    }
  });

const CustomPreset = usePassThrough(
    {
        InputMask: {
                class: ['name-field']
        }
    },
    {
        mergeSections: true,
        mergeProps: true
    }
);

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue, {pt: CustomPreset})

app.component('InputMask', InputMask);


app.mount('#app')

export default api