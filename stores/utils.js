/**
 * @typedef {{ commit: any, dispatch: any, getters: any }} Store
 * @typedef {Record<string, (store: Store, payload: any) => any>} ActionTree
 * @typedef {Record<string, any>} GetterTree
 * @type {<State, A extends ActionTree, G extends GetterTree>(store: { state?: State, actions?: A, getters?: G }) => Required<typeof store>}
 */
export function defineStore(store) {
  return store
}