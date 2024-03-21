import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { initDb } from './db' 





const app = createApp(App)

app.mount('#app')

initDb().catch((err)=>console.log(err))

