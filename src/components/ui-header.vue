<template>
    <header :class="$style.header">
        <div :class="$style['header__content']">

            <router-link :class="$style['header__home-link']" to="/">
                <img :class="$style['header__logo']" src="/assets/logo.png" alt="logo">
                <p :class="$style['header__title']">vue-contacts</p>
            </router-link>

            <p
                v-if="state.logined" 
                :class="$style['header__role']"
            >
                {{ state.role }}
            </p>

            <router-link
                v-if="!state.logined"
                :class="$style['header__client-btn']" 
                to="/auth"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                Войти
            </router-link>

            <button
                v-if="state.logined" 
                @click="logout"
                :class="$style['header__client-btn']"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 12v.01" /><path d="M3 21h18" /><path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" /><path d="M14 7h7m-3 -3l3 3l-3 3" /></svg>
                Выход
            </button>
            
        </div>
    </header>
</template>

<script setup>
    import { reactive, computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const store = useStore()

    const state = reactive({
        logined: computed(() => store.getters.userLogined),
        role: computed(() => store.getters.userRole)
    })

    const logout = () => {
        store.dispatch('userLogout')
        router.push('/auth')
    }
</script>

<style module lang="scss">
    .header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: var(--header-height);
        background-color: rgba(255, 255, 255, 0.7);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        z-index: 100;

        .header__content {
            display: flex;
            align-items: center;
            max-width: 1200px;
            width: 100%;
            height: var(--header-height);
            margin: 0 auto;
        }

        .header__home-link {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .header__logo {
            max-width: 48px;
            width: 100%;
        }

        .header__title {
            font-size: 18px;
            font-weight: 500;
            color: black;
        }

        .header__role {
            margin-left: 10px;
            padding: 2px 4px;
            border-radius: 5px;
            border: 1px solid var(--green);
            color: gray;
            font-size: 12px;
            font-weight: 400;
            line-height: 1;
            position: relative;
            top: 1px;
        }

        .header__client-btn {
            margin-left: auto;
            background-color: rgb(240, 240, 240);
            color: black;
            padding: 10px 15px;
            border-radius: 7px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color .2s;
            display: flex;
            align-items: center;
            gap: 5px;
            line-height: 1;

            &:hover {
                background-color: rgb(235, 235, 235);
            }
        }
    }
</style>