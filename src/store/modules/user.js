/* 
    Модуль глобального хранилища пользователя
*/

export default {
    state: {
        logined: localStorage.logined || false,
        role: localStorage.role || 'user'
    },
    getters: {
        userRole: state => {
            return state.role
        },
        userLogined: state => {
            return state.logined
        }
    },
    actions: {
        userLogin(context, role) {
            localStorage.role = role
            localStorage.logined = true
            context.commit('setRole', role)
            context.commit('setLogined', true)
        },
        userLogout(context) {
            delete localStorage.role
            delete localStorage.logined
            context.commit('setRole', 'user')
            context.commit('setLogined', false)
        },
    },
    mutations: {
        setRole: (state, value) => {
            state.role = value
        },
        setLogined: (state, value) => {
            state.logined = value
        }
    },
}