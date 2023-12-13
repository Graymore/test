/* 
    Модуль глобального хранилища контактов 
    Использует хелперы useFilter, useStats
*/

import contacts from '../../api/contacts'
import { useFilter } from '../../helpers/useFilter'
import { useStats } from '../../helpers/useStats'

export default {
    state: {
        contacts: [],
        contacts_copy: [],
        viewMode: localStorage.view_mode || 'table',
        stats: []
    },
    getters: {
        contacts: state => {
            return state.contacts
        },
        viewMode: state => {
            return state.viewMode
        },
        stats: state => {
            return state.stats
        }
    },
    actions: {
        async getContacts(context) {
            let { data } = await contacts.get()
            // Сразу мутируем результат получения
            context.commit('setContacts', data.results)
            // И делаем резервную копию
            context.commit('contactsCopy')
        },
        changeViewMode(context, mode) {
            localStorage.view_mode = mode
            context.commit('setViewMode', mode)
        },
        filterContacts(context, condition) {
            context.commit('setContacts', useFilter(this.getters.contacts, condition))
        },
        filterReset(context) {
            context.commit('contactsReset')
        },
        getStats(context) {
            let result = []

            const stats = useStats(this.getters.contacts)
            const genders = stats.genders()
            const size = stats.size()
            const nationals = stats.getNationals()

            result.push({
                title: 'Размер коллекции',
                value: size
            })
            result.push({
                title: 'Половая принадлежность',
                value: `Мужчины: ${genders.male}, Женщины: ${genders.female}, Не определились: ${genders.none}`
            })
            result.push({
                title: 'Половой фаворит',
                value: `${stats.translateGender(genders.favorite)}`
            })
    
            Object.keys(nationals).forEach(key => {
                result.push({
                    title: key,
                    value: nationals[key]
                })
            })

            context.commit('setStats', result)
        }
    },
    mutations: {
        setContacts(state, value) {
            state.contacts = value
        },
        setViewMode(state, value) {
            state.viewMode = value
        },
        setStats(state, value) {
            state.stats = value
        },
        contactsCopy(state) {
            state.contacts_copy = Object.assign([], state.contacts)
        },
        contactsReset(state) {
            state.contacts = Object.assign([], state.contacts_copy)
        }
    },
}