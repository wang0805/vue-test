import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0
  },
  mutations: {
    increment(state) {
      state.page++;
    },
    decrement(state) {
      state.page--;
    },
    setZero(state, payload) {
      state.page = payload;
    }
  },
  actions: {}
});
