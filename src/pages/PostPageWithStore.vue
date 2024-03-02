<template>
  <div class="wrapper">
    <div class="wr1">
      <h1>Страница с постами</h1>
      <input
        class="search-posts"
        :value="searchPosts"
        @input="setSearchPosts($event.target.value)"
        placeholder="Поиск постов"
        v-focus
      />
      <button class="createPost-btn" @click="toggleDialog">Создать пост</button>
    </div>
    <MyDialog @closeDialog="toggleDialog" :show="valueDialog">
      <PostCreater @create="createPost" />
    </MyDialog>

    <div class="post_wrapper">
      <div class="post_wrapper-list">
        <ListPosts
          :posts="sortAndSearchPosts"
          @deletePost="deletePost"
          v-if="!isPostLoading"
        />
        <div class="post_wrapper-list-else" v-else>Идет загрузка...</div>
        <div class="observer" v-intersection="loadMorePosts"></div>
      </div>
      <MySelect :options="selectOptions" @selectOption="setSelectSorted" />
    </div>
  </div>
</template>

<script>
import PostCreater from "@/components/PostCreater.vue";
import ListPosts from "@/components/ListPosts.vue";
import MyDialog from "@/components/MyDialog.vue";
import axios from "axios";
import MySelect from "@/components/MySelect.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostCreater,
    ListPosts,
    MyDialog,
    MySelect,
  },
  data() {
    return {
      valueDialog: false,
    };
  },
  methods: {
    ...mapMutations({
      setPageNumber: "post/setPageNumber",
      setSearchPosts: "post/setSearchPosts",
      setSelectSorted: "post/setSelectSorted",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      this.posts.unshift(post);
      this.toggleDialog();
    },
    deletePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    toggleDialog() {
      this.valueDialog = !this.valueDialog;
    },
    selectOption(option) {
      this.selectSorted = option;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectOptions: (state) => state.post.selectOptions,
      selectSorted: (state) => state.post.selectSorted,
      searchPosts: (state) => state.post.searchPosts,
      pageNumber: (state) => state.post.pageNumber,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortAndSearchPosts: "post/sortAndSearchPosts",
    }),
  },
  watch: {
    // pageNumber() {
    //   this.fetchPosts();
    // }
  },
};
</script>

<style>
.wrapper {
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
  margin: 0px auto;
}
.wr1 {
  display: flex;
  flex-direction: column;
}
h1 {
  margin-bottom: 30px;
  font-size: 44px;
}
.createPost-btn {
  width: 150px;
  height: 40px;
}

.post_wrapper {
  display: flex;
  gap: 30px;
}
.post_wrapper-list {
  width: 75%;
}
.post_wrapper-list-else {
  margin-bottom: 100vh;
}
.search-posts {
  margin-bottom: 10px;
  border: 2px solid darkBlue;
}

.page_wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px 0px 0px;
  gap: 5px;
}
.page_wrapper-item {
  border: 1px solid teal;
  padding: 5px 8px;
}
.page_wrapper-item:hover {
  border: 3px solid teal;
  text-decoration: underline;
}
.current-page {
  border: 2px solid black;
}
.observer {
  height: 20px;
}
</style>
