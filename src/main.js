import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import variables from './variables/variable'

const app = createApp(App)

app.use(variables)
app.use(router)
app.mount('#app')
