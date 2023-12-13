import { createRouter, createWebHistory } from "vue-router";
import { auth, notAuth } from './middleware'

// Компоненты
import AuthPage from '../pages/page-auth.vue'
import ContactsPage from '../pages/page-contacts.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/contacts',
            alias: '/',
            component: ContactsPage,
            beforeEnter: [auth]
        },
        {
            path: '/auth',
            component: AuthPage,
            beforeEnter: [notAuth]
        },
    ]
})