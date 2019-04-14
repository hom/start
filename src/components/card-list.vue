<template>
  <el-main class="card-list">
    <CardItem v-for="(card, key) of cards" :key="key" :card="card" />
    <AddCard />
  </el-main>
</template>

<script>
import { mapState } from 'vuex';
import CardItem from './card-item.vue';
import AddCard from './add-card.vue';

export default {
  data() {
    return {};
  },
  components: {
    CardItem,
    AddCard,
  },
  computed: {
    ...mapState({
      cards: (state) => state.cards
    })
  },
  mounted() {
    this.$store.dispatch('ACTION_FETCH_CARDS');
  }
};
</script>

<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 5px;
  grid-column-gap: 15px;
  align-items: start;
}
</style>
