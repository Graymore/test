 /*
    By Dmitry Titov.
    --------------------------
    Приложение использует: 
    
    Tippy.vue
    https://github.com/thecodewarrior/Tippy.vue

    Vuex
    https://vuex.vuejs.org

    VueRouter
    https://router.vuejs.org

*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {TippyPlugin} from 'tippy.vue';

const app = createApp(App)

app.use(router).use(store).use(TippyPlugin)
app.mount('#app')