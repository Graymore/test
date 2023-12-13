<template>
    <span
        :class="[$style['avatar'], {
            [$style['avatar__empty']]: state.useEmpty
        }]"
        :style="{
            width: props.width,
            height: props.height,
            borderRadius: props.radius,
        }"
    >
        <img
            @error="imageErorrHandler"
            :class="$style['avatar__image']"
            :src="props.src" 
            :alt="props.alt"
            :loading="props.loading"
            :style="{borderRadius: props.radius}"
            width="100%"
            height="100%"
        >
    </span>
</template>

<script setup>
    import { defineProps, reactive } from 'vue'

    /*
        -[Свойства]-
        src     - src атрибут из html
        alt     - alt атрибут из html
        width   - Ширина
        height  - Высота
        radius  - border-radius из css
        loading - атрибут img из html
    */

    const props = defineProps({
        src: {type: String, default: ''},
        alt: {type: String, default: 'avatar'},
        width: {type: String, default: '32px'},
        height: {type: String, default: '32px'},
        radius: {type: String, default: '50%'},
        loading: {type: String, default: 'lazy'},
    })

    const state = reactive({
        useEmpty: false
    })

    // Если при загрузке src произошла ошибка, показываем стандартый аватар
    const imageErorrHandler = (event) => {
        event.target.remove()
        state.useEmpty = true
    }
</script>

<style module lang="scss">
    .avatar {
        background-color: rgb(236, 236, 236);
        position: relative;
        display: flex;
        flex-shrink: 0;
        position: relative;

        &.avatar__empty {
            &::before {
                content: "?";
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                font-size: 16px;
                font-weight: 400;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                color: rgb(143, 143, 143);
            }
        }

        .avatar__image {
            object-fit: cover;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
</style>