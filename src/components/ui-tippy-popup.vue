<template>
    <tippy
        @attach="attach"
        on-body
        :target="props.target"
        :extra="{
            arrow: props.arrow,
            interactive: true, 
            placement: props.placement, 
            trigger: props.trigger,
            animation: props.animation,
            inertia: props.inertia,
            offset: props.offset,
            duration: props.duration,
            theme: props.theme,
            hideOnClick: props.hideOnClick,
        }"
    >
        <div @click="slotClickHandler" :class="$style['popup-slot']">
            <slot></slot>
        </div>
    </tippy>
</template>

<script setup>
    import { defineEmits, defineProps, ref, defineExpose } from 'vue';
    
    import 'tippy.js/dist/tippy.css'
    import 'tippy.js/animations/scale.css';
    import 'tippy.js/animations/scale-subtle.css';
    import 'tippy.js/animations/scale-extreme.css';
    import 'tippy.js/animations/shift-toward-subtle.css';

    const emits = defineEmits(['mounted'])

    const instance = ref()

    /*
        Этот компонент является оберткой для tippy.vue
        https://vue-tippy.netlify.app

        -[Свойства]-
        contentClick - Разрешить событие клик по контенту;
        
        Остальное описание свойств по ссылке:
        https://vue-tippy.netlify.app/props
    */

    const props = defineProps({
        contentClick: {type: Boolean, default: false},
        arrow: {type: Boolean, default: false},
        inertia: {type: Boolean, default: false},
        hideOnClick: {type: Boolean, default: true},
        trigger: {type: String, default: 'click'},
        animation: {type: String, default: 'fade'},
        placement: {type: String, default: 'bottom'},
        target: {type: String, default: '_parent'},
        theme: {type: String, default: 'default'},
        offset: {type: Array, default: () => [0, 10]},
        duration: {type: Array, default: () => [250, 250]},
    })

    const attach = (popup) => {
        instance.value = popup
        emits('mounted', popup)
    }

    const hide = () => {
        instance.value.hide()
    }

    const show = () => {
        instance.value.show()
    }

    const slotClickHandler = () => {
        if (!props.contentClick) hide()
    }

    defineExpose({
        attach,
        hide,
        show,
    })
</script>

<style module lang="scss">
    .popup {
        padding: 10px;
        margin: 50px auto;
        cursor: pointer;
        margin-left: 100px;
    }
</style>