import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import './styles/main.scss'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { surface, magnetic } from './directives/motion'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.directive('reveal', reveal)
app.directive('surface', surface)
app.directive('magnetic', magnetic)

app.mount('#app')
