import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";

import FontAwesomeIcon from '@/plugins/fontAwesome'


createApp(App).use(createPinia()).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
