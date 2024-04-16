import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//Persistance du store
import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)

const pinia = createPinia()
//Lier la persistance du store
pinia.use(piniaPersist)
// app.use(createPinia())
app.use(pinia)

app.use(router)

app.mount('#app')
