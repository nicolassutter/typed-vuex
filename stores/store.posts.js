import { defineStore } from './utils'

/**
 * @typedef {typeof postsStore} Store
 */
export const postsStore = defineStore({
  state: {
    posts: []
  },
  actions: {
    fetchPosts() {},
    updatePost() {}
  }
})