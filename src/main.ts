import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import { Loader } from '@googlemaps/js-api-loader'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Antd)

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: 'weekly'
})
loader.importLibrary('places')

app.mount('#app')
