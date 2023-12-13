<template>
    <div :class="$style.wrapper">

        <!-- Фильтры -->
        <section :class="[$style['wrapper__section'], $style['filters']]">
            <div :class="$style['filters__mode']">
                <button
                    @click="changeViewMode('table')" 
                    :class="[$style['filters__btn'], {
                    [$style['filters__btn_active']]: state.viewMode === 'table'
                }]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1zm6 -1v18m6 -18v18" /></svg>
                </button>
                <button
                    @click="changeViewMode('grid')"  
                    :class="[$style['filters__btn'], {
                    [$style['filters__btn_active']]: state.viewMode === 'grid'
                }]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
                </button>
            </div>

            <div :class="$style['filters__detail']">
                <button
                    v-if="store.getters.userRole === 'admin'"
                    :class="$style['filters__btn']"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>
                    <ui-tippy-popup theme="custom" animation="shift-toward-subtle">
                        <div :class="$style['popup']">
                            <button
                                @click="setFilter('A-Z')"
                                :class="$style['popup__button']"
                            >
                                По имени A-Z
                            </button>
                            <button
                                @click="setFilter('Z-A')"
                                :class="$style['popup__button']"
                            >
                                По имени Z-A
                            </button>
                            <button
                                @click="setFilter('gender')"
                                :class="$style['popup__button']"
                            >
                                По полу
                            </button>
                            <button
                                @click="setFilter('national')"
                                :class="$style['popup__button']"
                            >
                                По национальности
                            </button>
                            <hr :class="$style['popup__hr']"/>
                            <button
                                @click="filterReset"
                                :class="$style['popup__button']"
                            >
                                Сбросить все фильтры
                            </button>
                        </div>
                    </ui-tippy-popup>
                </button>
                <button @click="getContacts" :class="$style['filters__btn']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
                </button>
            </div>
        </section>

        <!-- Прелоудер -->
        <section
            v-show="state.loading" 
            :class="[$style['wrapper__section'], $style['loader']]"
        >
            <svg :class="$style['loader__svg']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 140">
                <rect y="10" width="15" height="120" rx="6">
                    <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                    <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                </rect>
                <rect x="30" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                    <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                </rect>
                <rect x="60" width="15" height="140" rx="6">
                    <animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                    <animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                </rect>
                <rect x="90" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                    <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                </rect>
                <rect x="120" y="10" width="15" height="120" rx="6">
                    <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                    <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                </rect>
            </svg>
        </section>

        <!-- Таблица -->
        <section
            v-show="!state.loading"  
            :class="[$style['wrapper__section'], $style['table']]"
        >
            <table 
                :class="[$style['table__element'], $style[`${state.viewMode}`]]"
            >
                <tr
                    v-show="state.viewMode === 'table'"
                    :class="$style['table__head']"
                >
                    <th
                        v-for="column in state.columns" 
                        :key="column"
                        :class="$style['table__head-item']"
                    >
                        {{ column }}
                    </th>
                </tr>
                <tr v-for="(contact, index) in state.paginationData" :key="index" 
                    :class="$style['table__item']"
                >
                    <td :class="[$style['table__item-td'], $style['avatar']]">
                        <ui-avatar/>
                    </td>
                    <td :class="[$style['table__item-td'], $style['name']]">
                        {{`${contact.name.title} ${contact.name.first} ${contact.name.last}`}}
                    </td>
                    <td :class="[$style['table__item-td'], $style['dob']]">
                        {{`${getDate(contact.dob.date)}, ${contact.dob.age} года`}}
                    </td>
                    <td :class="[$style['table__item-td'], $style['link']]">
                        <a
                            :class="$style['table__item-td-link']" 
                            :href="`mailto:${contact.email}`"
                        >
                            {{ contact.email }}
                        </a>
                    </td>
                    <td :class="[$style['table__item-td'], $style['link']]">
                        <a 
                            :class="$style['table__item-td-link']" 
                            :href="`tel:${contact.phone}`"
                        >
                            {{ contact.phone }}
                        </a>
                    </td>
                    <td :class="[$style['table__item-td'], $style['country']]">
                        {{ `${contact.location.country}, ${contact.location.city}` }}
                    </td>
                    <td :class="[$style['table__item-td'], $style['nat']]">
                        {{ contact.nat }}
                    </td>
                </tr>
            </table>
        </section>

        <!-- Пагинация -->
        <section
            v-show="!state.loading" 
            :class="[$style['wrapper__section'], $style['pagination']]"
        >
            <ui-pagination
                v-if="state.contacts.length > 0"
                ref="paginator"
                @paginationData="data => { state.paginationData = data }"
                :data="state.contacts"
            />
        </section>

        <!-- Статистика -->
        <section
            v-show="!state.loading" 
            :class="[$style['wrapper__section'], $style['stats']]"
        >
            <h1 :class="$style['stats__title']">Статистика</h1>
            <div :class="$style['stats__items']">
                <article
                    v-for="item in state.stats" :key="item" 
                    :class="$style['stats__article']"
                >
                    <p :class="$style['stats__item-title']">{{ item.title }}</p>
                    <p :class="$style['stats__item-value']">{{ item.value }}</p>
                </article>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { computed, onMounted, reactive, ref } from 'vue'
    import { useStore } from 'vuex'
    import UiAvatar from '../components/ui-avatar.vue'
    import UiPagination from '../components/ui-pagination.vue'
    import UiTippyPopup from '../components/ui-tippy-popup.vue'
    import { useDate } from '../helpers/useDate'

    const store = useStore()
    const paginator = ref()

    const state = reactive({
        contacts: computed(() => store.getters.contacts),
        stats: computed(() => store.getters.stats),
        viewMode: computed(() => store.getters.viewMode),
        loading: true,
        paginationData: [],
        columns: ['Avatar', 'FullName', 'Birthday', 'Email', 'Phone', 'Location', 'Национальность'],
        activeFilters: []
    })

    // Установка фильтрации данных по условию
    const setFilter = async (condition) => {
        await store.dispatch('filterContacts', condition)
        paginator.value.calculate()
    }

    // Сброс всех фильтров
    const filterReset = async () => {
        await store.dispatch('filterReset')
        paginator.value.calculate()
    }

    // Получение/Обновление всех контактов
    const getContacts = async () => {
        state.loading = true
        await store.dispatch('getContacts')
        getStats()
        paginator.value.calculate()
        state.loading = false
    }

    // Обработка даты в требуемый формат использует хелпер useDate
    const getDate = (dateValue) => {
        const date = useDate(dateValue)

        const day = date.day(true)
        const dateFormat = date.humanFormat()
        const time = date.time()

        return `${day}. ${dateFormat}, ${time}`
    }

    // Метод для изменения вида таблицы - Таблица/Плитка
    const changeViewMode = mode => store.dispatch('changeViewMode', mode)

    // Вычисление статистики по контактам
    const getStats = async () => await store.dispatch('getStats')

    onMounted(async () => {
        // Если в стейте нет контактов, значит нужно их получить, вместе со статой
        if (state.contacts.length === 0) {
            await getContacts()
            getStats()
            state.loading = false
        }
    })
</script>

<style module lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        padding: 20px 0;

        .wrapper__section {
            background-color: white;
            border-radius: 10px;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, .05);
        }

        .table {
            .table__element {
                width: 100%;
                border-spacing: 0;
                border-collapse: collapse;

                &.table {

                    .table__head {
                        border-bottom: 1px solid rgba(181, 181, 181, 0.1);
                    }
                    .table__head-item {
                        padding: 10px 7px;
                        text-align: left;
                        font-size: 14px;
                        font-weight: 500;
                        color: rgb(63, 163, 63);

                        &:first-child {
                            text-align: center;
                        }
                    }
                    .table__item-td {
                        padding: 3px 7px;
                        font-size: 14px;
                        font-weight: 400;
                        border-bottom: 1px solid rgba(181, 181, 181, 0.1);

                        &:nth-child(2n) {
                            background-color: rgba(181, 181, 181, 0.1);
                        }

                        &.link {
                            color: silver;
                        }

                        &.avatar {
                            display: flex;
                            justify-content: center;
                        }
                    }
                    .table__item-td-link {
                        color: rgb(64, 184, 131);
                        font-weight: 500;
                    }
                }

                &.grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    padding: 10px;

                    .table__item {
                        display: flex;
                        flex-direction: column;
                        min-width: 287px;
                        background-color: rgb(247, 247, 247);
                        padding: 10px;
                        border-radius: 10px;
                    }

                    .avatar {
                        margin: 0 auto;
                    }

                    .name {
                        font-size: 16px;
                        font-weight: 500;
                        margin-top: 10px;
                    }

                    .dob {
                        color: gray;
                        font-size: 13px;
                        margin-top: 3px;
                    }

                    .link {
                        margin-top: 5px;
                        .table__item-td-link {
                            color: green;
                            font-size: 13px;
                            font-weight: 500;
                        }
                    }

                    .country {
                        margin-top: 10px;
                        font-size: 14px;
                        font-weight: 600;
                    }

                    .nat {
                        color: gray;
                        font-size: 13px;
                        font-weight: 500;
                    }
                }
            }
        }

        .filters {
            padding: 10px;

            .filters__mode {
                display: flex;
                gap: 5px;
            }

            .filters__btn {
                background-color: rgb(239, 239, 239);
                line-height: 1;
                color: rgb(88, 88, 88);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color .18s, color .18s;

                &:hover {
                    background-color: rgb(231, 231, 231);
                }

                &.filters__btn_active {
                    background-color: rgb(64, 184, 131);
                    color: white;
                }
            }

            .filters__detail {
                display: flex;
                gap: 5px;
                margin-left: auto;
            }
        }

        .pagination {
            padding: 10px;
        }

        .loader {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;

            .loader__svg {
                fill: blue;
                width: 48px;
                height: 48px;
            }
        }

        .stats {
            padding: 10px;
            flex-direction: column;
            align-items: normal;
            gap: 10px;

            .stats__title {
                font-size: 18px;
                font-weight: 300;
            }

            .stats__items {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .stats__article {
                display: flex;
                align-items: center;
                padding: 5px;

                &:nth-child(2n) {
                    background-color: rgb(242, 242, 242);
                }
            }

            .stats__item-title {
                font-size: 16px;
                font-weight: 400;
            }

            .stats__item-value {
                font-size: 16px;
                font-weight: 500;
                color: rgb(64, 184, 131);
                margin-left: auto;
            }
        }
    }

    .popup {
        display: flex;
        flex-direction: column;
        gap: 3px;
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
        padding: 5px;
        border-radius: 5px;
        min-width: 150px;
        border: 1px solid var(--green);

        .popup__button {
            cursor: pointer;
            color: black;
            border-radius: 5px;
            background-color: transparent;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            padding: 3px 20px 3px 10px;

            &:hover {
                background-color: var(--green);
                color: white;
            }
        }

        .popup__hr {
            width: 100%;
            height: 1px;
            background-color: var(--hr);
        }
    }
</style>