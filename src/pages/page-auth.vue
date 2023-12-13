<template>
    <div :class="$style['auth']">

        <h1 :class="$style['auth__title']">
            Выберите роль
        </h1>
        
        <div :class="$style['auth__radios']">
            <ui-radio title="Пользователь" value="user" group="roles" v-model="state.role"/>
            <ui-radio title="Администратор" value="admin" group="roles" v-model="state.role"/>
        </div>

        <button 
            @click="login" 
            :class="$style['auth__login-btn']"
        >
            Войти
        </button>
    </div>
</template>

<script setup>
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import UiRadio from '../components/ui-radio.vue'

    const router = useRouter()
    const store = useStore()

    const state = reactive({
        role: 'user',
    })

    const login = () => {
        store.dispatch('userLogin', state.role)
        router.push('/')
    }
</script>

<style module lang="scss">
    .auth {
        margin: auto;
        background-color: var(--section-bg-color);
        padding: 40px;
        border-radius: 10px;
        max-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;

        .auth__title {
            font-size: 18px;
            font-weight: 500;
        }

        .auth__radios {
            display: flex;
            flex-direction: column;
            gap: 7px;
            margin-top: 20px;
        }

        .auth__login-btn {
            background-color: rgb(64, 184, 131);
            color: white;
            cursor: pointer;
            padding: 12px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 7px;
            margin-top: 30px;
        }
    }
</style>