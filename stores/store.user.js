import { defineStore } from './utils'

/**
 * @typedef {typeof userStore} Store
 */
export const userStore = defineStore({
  state: {
    user: {}
  }, 
  actions: {
    fetchUser() {},
    updateUser() {}
  }
})