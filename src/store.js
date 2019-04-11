/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    items: [],
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_ITEMS(state, items) {
      state.items = items;
    },
  },
  actions: {
    async ACTION_FETCH_CARDS({ commit }) {
      let results;
      try {
        results = await Axios.get('http://start.pongj.com/api/cards', {
          headers: {
            'X-Parse-Application-Id': '49WFxt4BxWWrCaKCPcHikcwcCLPTiVUc',
            'X-Parse-JavaScript-Key': '6DDPazgcjh6HaVJ2NJpXDLpPWPYuqpNf'
          }
        })
      } catch (error) {
        return console.error(error.response.data.error);
      }
      console.log(results.data);
      commit('SET_CARDS', results.data.data);
    },
    // async ACTION_FETCH_ITEMS({ commit }, objectId) {
    //   let results;
    //   try {
    //     results = await Axios.get('http://start.pongj.com/api/cards', {
    //       headers: {
    //         'X-Parse-Application-Id': '49WFxt4BxWWrCaKCPcHikcwcCLPTiVUc',
    //         'X-Parse-JavaScript-Key': '6DDPazgcjh6HaVJ2NJpXDLpPWPYuqpNf'
    //       }
    //     })
    //   } catch (error) {
    //     return console.error(error.response.data.error);
    //   }
    //   console.log(results.data);
    // },
  },
});
