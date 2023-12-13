import store from '../store'

// Доступ только авторизованным
export const auth = (to, from, next) => {
    store.getters.userLogined ? next() : next('/auth')
}

// Доступ только не авторизованным
export const notAuth = (to, from, next) => {
    store.getters.userLogined === false ? next() : next('/')
}