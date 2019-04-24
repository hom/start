/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'X-Parse-Application-Id': process.env.VUE_APP_PARSE_APPID,
    'X-Parse-JavaScript-Key': process.env.VUE_APP_PARSE_JAVASCRIPT_KEY
  }
});

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
        results = await axios.get('/api/cards')
      } catch (error) {
        console.error(error);
        return console.error(error.response.data.error);
      }

      commit('SET_CARDS', results.data.data);
    },
    
    async ACTION_ADD_CARD({ state, commit }, card) {
      let result;
      try {
        result = await axios.post('/api/card', card)
      } catch (error) {
        return new Error(error.response.data);
      }

      let cards = state.cards;
      cards.push(result.data.data);
      commit('SET_CARDS', cards);
      return result.data.data;
    },

    async ACTION_ADD_MARK({ commit }, mark) {
      let card = {
        objectId: mark.card,
        className: 'Card',
        __type: 'Pointer'
      };

      mark.card = card;

      let result;
      try {
        result = await axios.post('/api/mark', mark)
      } catch (error) {
        console.error(error);
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_DELETE_MARK({ commit }, mark) {
      let result;
      try {
        result = await axios.delete(`/parse/classes/Mark/${mark.objectId}`)
      } catch (error) {
        console.error(error);
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_EDIT_CARD({ commit }, { objectId, title }) {
      let result;
      try {
        result = await axios.put(`/parse/classes/Card/${objectId}`, { title })
      } catch (error) {
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_DELETE_CARD({ state,commit }, { objectId, index }) {
      let result;
      try {
        result = await axios.delete(`/parse/classes/Card/${objectId}`)
      } catch (error) {
        return new Error(error.response.data);
      }

      let cards = state.cards;
      cards.splice(index, 1);
      commit('SET_CARDS', cards);
      return result.data.data;
    },
  },
});
