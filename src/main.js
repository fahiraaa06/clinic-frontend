import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VCalendar from 'v-calendar';
import VueSplide from '@splidejs/vue-splide';


library.add(fas)

createApp(App)
.component('fas', FontAwesomeIcon)
.use(store)
.use( VueSplide )
.use(VCalendar, {})
.use(router)
.mount('#app')
