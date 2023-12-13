<template>
    <label
        :for="`radio_id_${$.uid}`"
        :class="$style['radio']"
    >
        <p 
            v-if="props.title.trim() !== ''"
            :class="$style['radio__title']"
        >
            {{ props.title }}
        </p>

        <input 
            type="radio"
            :class="$style['radio__input']"
            :id="`radio_id_${$.uid}`"
            :name="props.group"
            :value="props.value"
            :checked="props.modelValue.includes(props.value)"
            @input="event => onInput(event.target.value)"
        >
        
    </label>
</template>

<script setup>
    import {defineProps, defineEmits} from 'vue'

    /*
        -[Свойства]-
        modelValue - свойство связывания элемента
        title      - заголовок кнопки
        group      - принадлежность к группе кнопок (атрибут name)
        value      - атрибут значения html value
    */
    const props = defineProps({
        modelValue: {type: String, default: ''},
        title: {type: String, default: ''},
        group: {type: String, default: 'radio'},
        value: {type: String},
    })

    // Инициализиурем emits событий
    const emits = defineEmits(['update:modelValue'])

    // Испускаем изменения при событии input, получив новый value
    const onInput = (value) => {
        emits('update:modelValue', value)
    }
</script>

<style module lang="scss">
    .radio {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        background-color: var(--btn-bg-color);
        border: 2px solid transparent;
        padding: 10px;
        border-radius: 10px;
        transition: border-color .17s, color .17s, background-color .17s;

        &:has(.radio__input:checked) {
            border-color: var(--green);
            background-color: transparent;
            color: var(--green);
        }

        .radio__title {
            font-size: 14px;
            font-weight: 400;
            color: inherit;
        }

        .radio__input {
            margin-left: auto;
        }
    }
</style>