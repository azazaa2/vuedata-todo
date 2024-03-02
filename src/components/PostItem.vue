<template>
    <div class="listPosts-item">
        <div class="listPosts-item-wr">
            <h3>{{post.id}} likes = {{$store.state.likes}}</h3>
            <h2><b>Название:</b> {{ post.title }}</h2>
            <p><b>Описание:</b> {{ post.body }}</p>
        </div>
        <div class="listPost-item-btns">
            <button class="listPosts-item-delete" @click="$emit('deletePost', post)" >Удалить</button>
            <button class="listPosts-item-open" @click="$router.push(`/posts/${post.id}`)" >Открыть</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {

    }
}
</script>

<style>
.listPosts-item {
  padding: 15px;
  border:3px solid teal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.listPosts-item-wr {
    display: flex;
    flex-direction: column;
}
.listPosts-item-delete {
    width: 100%;
    max-width: 100px;
    height: 30px;
    border:1px solid red;
    color: red;
}
.listPosts-item-open {
    width: 100%;
    max-width: 100px;
    height: 30px;
    border:1px solid teal;
    color: teal;
}
.listPost-item-btns {
    display:flex;
    flex-direction:column;
    gap:10px;
    min-width:100px;
    max-width:200px;
}
</style>