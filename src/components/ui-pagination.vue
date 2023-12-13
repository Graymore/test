<template>
    <div :class="$style['pagination']">
        <button
            v-for="btn in state.pages" :key="btn"
            @click="to(btn.from, btn.to, btn.index)"
            :class="[$style['pagination__btn'], {
                [$style['pagination__btn_active']]: state.activeIndex === btn.index
            }]"
        >
            {{ btn.text }}
        </button>
    </div>
</template>

<script setup>
    import { defineProps, reactive, onMounted, defineEmits, computed, defineExpose } from 'vue'

     /*=
        -[Свойства]-
        data - Массив данных для пагинации
        size - Размер одной страницы
        index - С какой страницы показать пагинацию
    */

    const props = defineProps({
        data: {type: Array},
        size: {type: Number, default: 10},
        index: {type: Number, default: 1},
    })

    const emits = defineEmits(['paginationData'])

    const state = reactive({
        data: computed(() => props.data),
        pages: [],
        activeIndex: 0
    })

    // Высчитываем страницы из данного массива, переходим на страницу props.index
    const calculate = () => {
        state.pages = []
        state.activeIndex = 0

        for (let i = 0; i < Math.ceil(state.data.length / props.size); i++) {
            state.pages.push({
                text: i + 1,
                from: i * props.size,
                to: i * props.size + props.size,
                index: i
            })
        }
        to(props.index - 1, props.size, props.index - 1)
    }

    // Переход на стринцу props.index
    const to = (from, to, index) => {
        emits('paginationData', props.data.slice(from, to))
        state.activeIndex = index
    }

    // Делим событие calculate 
    defineExpose({ calculate })

    onMounted(() => {
        calculate()
    })
</script>

<style module lang="scss">
    .pagination {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;

        .pagination__btn {
            background-color: rgb(241, 241, 241);
            padding: 5px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 5px;
            cursor: pointer;
            min-width: 30px;
            border: 1px solid transparent;
            transition: background-color .18s, border-color .18s, color .18s;

            &:hover {
                background-color: transparent;
                border-color: var(--green);
            }

            &.pagination__btn_active {
                background-color: var(--green);
                color: white;
            }
        }
    }
</style>