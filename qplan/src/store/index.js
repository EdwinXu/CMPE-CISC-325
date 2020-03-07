import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showProgressSidebar: true,
  },
  mutations: {
    updateProgressSidebar(state, value) {
      state.showProgressSidebar = value
    },
  },
  actions: {
  },
  getters: {
    showProgressSidebar: state => state.showProgressSidebar,
  },
})
