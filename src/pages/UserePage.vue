<template>
    <div class="wrapper">
      <div class="wr1">
        <h1>Страница с постами</h1>
        <input class="search-posts" v-model="searchPosts" placeholder="Поиск постов" v-focus />
        <button class="createPost-btn" @click="toggleDialog" >Создать пост</button>
      </div>
      <MyDialog @closeDialog="toggleDialog" :show="valueDialog" >
        <PostCreater @create="createPost" />
      </MyDialog>
      
      <div class="post_wrapper">
        <div class="post_wrapper-list">
          <ListPosts :posts="sortAndSearchPosts" @deletePost="deletePost" v-if="!isPostLoading" />
          <div class="post_wrapper-list-else" v-else> Идет загрузка...</div>
          <!-- <div class="page_wrapper">
            <div class="page_wrapper-item" :class="{ 'current-page': page === pageNumber}" @click="changePage(page)" v-for="page in totalPages" :key="page">{{page}}</div>
          </div> -->
          <div class="observer" v-intersection="loadMorePosts"></div>
        </div>
        <MySelect :options="selectOptions" @selectOption="selectOption" />
      </div>
    </div>
  </template>
  
  <script>
  import PostCreater from '@/components/PostCreater.vue'
  import ListPosts from '@/components/ListPosts.vue'
  import MyDialog from '@/components/MyDialog.vue'
  import axios from 'axios'
  import MySelect from '@/components/MySelect.vue'
  
  export default {
    components: {
      PostCreater,
      ListPosts,
      MyDialog,
      MySelect
  },
    data() {
      return {
        posts:[],
        valueDialog: false,
        isPostLoading: false,
        selectOptions:[
          {value:'title', name:'По Названию'},
          {value:'body', name:'По Описанию'},
        ],
        selectSorted:'',
        searchPosts: '',
        pageNumber:1,
        limit:10,
        totalPages:0,
      }
    },
    methods: {
      createPost(post) {
        this.posts.unshift(post)
        this.toggleDialog()
      },
      deletePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id)
      },
      // openPost(post) {

      // },
      toggleDialog() {
        this.valueDialog = !this.valueDialog
      },
      async fetchPosts() {
        try {
          this.isPostLoading = !this.isPostLoading
          setTimeout(async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page:this.pageNumber,
                _limit:this.limit,
              }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data
            this.isPostLoading = !this.isPostLoading
          }, 1000)
          
        } catch(e) {
          alert('Ошибка')
        }
      },
      async loadMorePosts() {
        try {
          this.pageNumber += 1
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page:this.pageNumber,
              _limit:this.limit,
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data]
        } catch(e) {
          alert('Ошибка')
        }
      },
      // changePage(a) {
      //   this.pageNumber = a;
      // },
      selectOption(option) {
        this.selectSorted = option
      }
    },
    mounted() {
      this.fetchPosts()
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectSorted]?.localeCompare(post2[this.selectSorted])
        })
      },
      sortAndSearchPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchPosts.toLowerCase()))
      }
    },
    watch: {
      // pageNumber() {
      //   this.fetchPosts();
      // }
    }
  }
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
    margin-bottom:100vh;
  }
  .search-posts {
    margin-bottom:10px;
    border:2px solid darkBlue;
  }
  
  .page_wrapper {
    display:flex;
    width:100%;
    justify-content:center;
    margin:10px 0px 0px;
    gap:5px;
  }
  .page_wrapper-item {
    border:1px solid teal;
    padding:5px 8px;
  }
  .page_wrapper-item:hover {
    border:3px solid teal;
    text-decoration:underline;
  }
  .current-page {
    border:2px solid black;
  }
  .observer {
    height:20px;
  }
  </style>