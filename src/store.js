import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0,
    isDisabled: true,
    upDisabled: false
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
    },
    setIsDisabled(state, payload) {
      state.isDisabled = payload;
    },
    setUpDisabled(state, payload) {
      state.upDisabled = payload;
    }
  },
  actions: {}
});
