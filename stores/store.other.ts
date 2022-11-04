import { defineStore } from './utils'

type Book = {
  title: string
  author: string
}

export const otherStore = defineStore({
  state: {
    book: <Book> {
      title: '',
      author: ''
    }
  },
  getters: {
    author(state) {
      return state.book.author
    }
  },
  actions: {
    fetchBook() {}
  }
})

export type Store = typeof otherStore