<template>
    <div class="myDialog" v-show="show" @click="$emit('closeDialog')">
        <div class="myDialog-main" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type:Boolean,
            default:false
        }
    }
}
</script>

<style>
    .myDialog {
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        display:flex;
        background-color: rgba(0,0,0, .5);
    }
    .myDialog-main {
        min-width:300px;
        margin:auto;
        background:white;
    }
</style>