import axios from 'axios'

export default {
    get() {
        return axios.get('https://randomuser.me/api/?results=200')
    }
}