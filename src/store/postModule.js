import axios from 'axios'
export default {
  namespaced: true,
  state: () => ({
    posts: [],
    isPostLoading: false,
    selectOptions: [
      { value: 'title', name: 'По Названию' },
      { value: 'body', name: 'По Описанию' },
    ],
    selectSorted: '',
    searchPosts: '',
    pageNumber: 1,
    limit: 10,
    totalPages: 0,
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectSorted]?.localeCompare(post2[state.selectSorted])
      })
    },
    sortAndSearchPosts(state, getters) {
      return getters.sortedPosts.filter(post => {
        const title = post.title || '';
        const searchPosts = state.searchPosts || '';
        return title.toLowerCase().includes(searchPosts.toLowerCase()
        )
      });
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool
    },
    setSelectSorted(state, selectSort) {
      state.selectSorted = selectSort
    },
    setSearchPosts(state, searchPost) {
      state.searchPosts = searchPost
    },
    setPageNumber(state, page) {
      state.pageNumber = page
    },
    setLimit(state, lim) {
      state.limit = lim
    },
    setTotalPages(state, totalPage) {
      state.totalPages = totalPage
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: state.pageNumber,
              _limit: state.limit,
            }
          });
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
          commit('setPosts', response.data)
          commit('setLoading', false)
        }, 1000)

      } catch (e) {
        console.log(e)
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPageNumber', state.pageNumber + 1)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.pageNumber,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        console.log(e)
      }
    },
  },
}