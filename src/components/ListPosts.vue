<template>
    <div class="listPosts" v-if="posts.length > 0">
      <transition-group name="post-list">
      <PostItem class="listPosts-item" v-for="(post) in posts" :post="post" :key="post.id" @deletePost="deletePost" />
      </transition-group>
    </div>
    <div class="noListPosts" v-else> Посты уехали в отпуск!</div>
</template>

<script>
import PostItem from '@/components/PostItem.vue'
export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    deletePost(post) {
      this.$emit('deletePost', post)
    },
    openPost1(post) {
      this.$emit('openPost', post)
    }
  }
}
</script>

<style>
.listPosts {
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* width: 75%; */
}
.noListPosts {
  width: 100%;
  padding: 20px;
  display: flex;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  border:3px solid teal;
  color: teal;
  font-size: 60px;
}
.post-list {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.8s ease;
}
.post-list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
.post-list-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.post-list-move {
  transition: transform 0.8s ease;
}
</style>