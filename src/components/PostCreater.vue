<template>
    <div class="createPost">
      <h3>Создание поста</h3>
      <input type="text" placeholder="Название поста" v-model.trim="post1.title" v-focus>
      <input type="text" placeholder="Описание поста" v-model.trim="post1.body">
      <button @click="createPost()">Создать</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
          post1: {
            title: '',
            body: '',
          },
          
        }
    },
    methods: {
      createPost() {
      if((this.post1.title && this.post1.text) === '') {
          return
      } else {
          this.post1.id = Date.now()
          this.$emit('create', this.post1)
          this.post1 = {
            title: '',
            body: ''
          }
      }
    }
    }
}
</script>

<style>
.createPost {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid teal;
  padding: 20px;
  align-items: end;
}
h3 {
  width: 100%;
}
input {
  width: 100%;
  height: 40px;
  padding-left: 20px;
}
button {
  width: 100px;
  height: 30px;
  background: none;
  border: 1px solid green;
  color: green;
}
</style>