<template>
  <listOfProducts :products="getSmartphones"/>
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
      'getSmartphones',
    ]),
  },
  created() {
    this.getSmartphonesAction()
  },
  methods: {
    ...mapActions([
      'getSmartphonesAction'
    ]),
  }
};
</script>

<style>
</style>

