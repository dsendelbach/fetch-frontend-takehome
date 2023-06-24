import Vue from 'vue'

export const state = () => ({
  saved: localStorage.saved ? JSON.parse(localStorage.saved) : {}
})

export const mutations = {
  toggleSaved(state, id) {
    if (state.saved[id]) {
      Vue.set(state.saved, id, undefined)
      delete state.saved[id];
    } else {
      Vue.set(state.saved, id, true)
    }
    localStorage.setItem('saved', JSON.stringify(state.saved));
  },
}
