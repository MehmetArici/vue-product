<template>
  <ul class="listOfProducts">
    <li v-for="(product, index) in products" :key="index" class="product">
      <router-link :to="{ name: 'Product', params: { id: product.id }}">
        <img :src="product.imageUrl" alt="">
        <h2 class="product-name">
          {{ product.name }}
        </h2>
      </router-link>
      <div class="product-price">
        <span>$ {{ product.price }}, 00</span>
        <span>{{ product.status.replace("_", " ").replace("_", " ") }}</span>
      </div>

      <btn btnColor="btn btn-large btn-sucess"
          :cartIcon="true"
           :disabled="product.quantity == 0"
          @click.native="addProductToCart(product)">
        Add to cart
      </btn>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';
import btn from './Btn';

export default {
  props: ['products'],

  components: {
    btn,
  },
  methods: {
    ...mapActions([
      'addProduct',
    ]),

    addProductToCart(product) {
      this.addProduct(product);
      product.quantity--
    },
  },
};
</script>

<style scoped>
  .listOfProducts {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }

  .product {
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
  }

  .product-name {
    font-size: 1.2em;
    font-weight: normal;
  }

  .product-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .product-price {
    width: 100%;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
  }

</style>

