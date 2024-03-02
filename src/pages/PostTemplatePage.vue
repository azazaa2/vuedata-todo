<template>
    <div class="post-template-page">
        <h1>Это страница поста с ID = {{ $route.params.id }}</h1>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .post-template-page {
        width:100%;
        max-width:1400px;
        margin:0px auto;
        padding:10px 20px;
        display:flex;
        justify-content:center;
    }
</style>