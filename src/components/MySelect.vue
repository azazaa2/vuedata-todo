<template>
    <div class="my-select">
        <h1 class="my-select-title">Сортировка</h1>
        <div class="my-select_wr1">
            <select class="my-select_wr1-select" v-model="modelValue" @change="changeOption">
                <option class="my-select_wr1-select-option" disabled value="">Выберите из списка</option>
                <option v-for="option in options" :key="option.value" class="my-select_wr1-select-option" :value="option.value">{{ option.name }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MySelect',
    props: {
        options: {
            type:Array,
            default: () => []
        },
    },
    data() {
        return {
            modelValue:'',
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('selectOption', event.target.value)
        }
    }
}
</script>

<style>
    .my-select {
        width: 25%;
        display: flex;
        flex-direction: column;
    }
    .my-select_wr1 {
        display: flex;
        border: 2px solid teal;
        padding: 5px;
    }
    .my-select_wr1-select {
        width: 100%;
        min-height: 30px;
    }
    .my-select_wr1-select-option {
        height: 30px;
    }
</style>