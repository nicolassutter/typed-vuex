import { defineStore } from './utils'

export const miscStore = defineStore({
  state: {
    misc: {
      count: 0
    }
  },
  getters: {
    double(state) {
      state.count * 2 
    }
  },
  actions: {
    fetchCount() {},
    updateCount() {}
  }
})

export type Store = typeof miscStore