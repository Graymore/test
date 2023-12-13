import { createStore } from 'vuex'
import contacts from './modules/contacts'
import user from './modules/user'

export default createStore({
    modules: {
        user,
        contacts
    }
})