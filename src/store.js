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

      commit('SET_CARDS', results.data.data);
    },
    
    async ACTION_ADD_CARD({ state, commit }, card) {
      let result;
      try {
        result = await Axios.post('http://start.pongj.com/api/card', card, {
          headers: {
            'X-Parse-Application-Id': '49WFxt4BxWWrCaKCPcHikcwcCLPTiVUc',
            'X-Parse-JavaScript-Key': '6DDPazgcjh6HaVJ2NJpXDLpPWPYuqpNf',
          },
        })
      } catch (error) {
        return new Error(error.response.data);
      }

      let cards = state.cards;
      cards.push(result.data.data);
      commit('SET_CARDS', cards);
      return result.data.data;
    },

    async ACTION_ADD_MARK({ commit }, mark) {
      console.log("TCL: ACTION_ADD_MARK -> mark", mark)
      let card = {
        objectId: mark.card,
        className: 'Card',
        __type: 'Pointer'
      };

      mark.card = card;

      let result;
      try {
        result = await Axios.post('http://start.pongj.com/api/mark', mark, {
          headers: {
            'X-Parse-Application-Id': '49WFxt4BxWWrCaKCPcHikcwcCLPTiVUc',
            'X-Parse-JavaScript-Key': '6DDPazgcjh6HaVJ2NJpXDLpPWPYuqpNf',
          },
        })
      } catch (error) {
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_DELETE_MARK({ commit }, mark) {
      let result;
      try {
        result = await Axios.delete(`http://start.pongj.com/parse/classes/Mark/${mark.objectId}`, {
          headers: {
            'X-Parse-Application-Id': '49WFxt4BxWWrCaKCPcHikcwcCLPTiVUc',
            'X-Parse-JavaScript-Key': '6DDPazgcjh6HaVJ2NJpXDLpPWPYuqpNf',
          },
        })
      } catch (error) {
        return new Error(error.response.data);
      }

      return result.data.data;
    }
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
