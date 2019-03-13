<template>
  <listOfProducts :products="getNotebooks"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import listOfProducts from './ListOfProducts';

export default {
  components: {
    listOfProducts,
  },

  computed: {
    ...mapGetters([
      'getNotebooks',
    ]),
  },
  created() {
    this.getNotebooksAction()
  },
  methods: {
    ...mapActions([
      'getNotebooksAction'
    ]),
  }
};
</script>

<style>
</style>

