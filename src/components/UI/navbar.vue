<template>
    <div class="navbar">
        <h1 @click="$router.push('/')">Vue 3</h1>
        <div class="navbar_btns">
            <router-link class="navbar_btns-item" to="/userePage" >Посты</router-link>
            <router-link class="navbar_btns-item" to="/about" >О сайте</router-link>
            <router-link class="navbar_btns-item" to="/store" >Store</router-link>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .navbar {
        width:100%;
        max-width:1000px;
        margin:0px auto 30px;
        display:flex;
        /* flex-direction:column; */
        padding:10px 20px;
        border-bottom:1px solid black;
        /* background-color:teal; */
        justify-content:space-between;
        align-items:center;
    }
    .navbar_btns {
        display:flex;
        width:100%;
        max-width:800px;
        justify-content:flex-end;
        gap:10px;
        height:40px;
    }
    .navbar_btns-item {
        text-decoration:none;
        font-size:18px;
        color:teal;
        width:120px;
        height:40px;
        border:2px solid teal;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    h1 {
        cursor:pointer;
    }
</style>