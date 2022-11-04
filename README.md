# Typed Vuex

⚠️ This should not be used as is.

From Vuex stores (JS or TS):

1. Generate a declaration file for every store
2. Use these files to merge every store into one
3. TODO: Use the single store to type vuex methods like `commit`, `dispatch`, ... As well as type `defineStore` correctly.

The reason we use .d.ts files for each store instead of using the source file like `typeof import('source-store.store.js')`, is to avoid circular references ("xxx references itself...") in larger projects.
