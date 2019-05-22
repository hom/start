/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

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
      let params = {
        order: 'sort'
      }
      let results;
      try {
        results = await api.get('/api/cards', {
          params,
        })
      } catch (error) {
        console.error(error);
        return console.error(error.response.data.error);
      }

      commit('SET_CARDS', results.data.data);
    },
    
    async ACTION_ADD_CARD({ state, commit }, card) {
      let result;
      try {
        result = await api.post('/api/card', card)
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
        result = await api.post('/api/mark', mark)
      } catch (error) {
        console.error(error);
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_DELETE_MARK({ commit }, mark) {
      let result;
      try {
        result = await api.delete(`/parse/classes/Mark/${mark.objectId}`)
      } catch (error) {
        console.error(error);
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_EDIT_CARD({ commit }, { objectId, title }) {
      let result;
      try {
        result = await api.put(`/parse/classes/Card/${objectId}`, { title })
      } catch (error) {
        return new Error(error.response.data);
      }

      return result.data.data;
    },

    async ACTION_DELETE_CARD({ state,commit }, { objectId, index }) {
      let result;
      try {
        result = await api.delete(`/parse/classes/Card/${objectId}`)
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
