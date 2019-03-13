<template>
  <div class="product-box">
    <div class="product-image">
      <img :src="currentProduct.imageUrl" alt="">
      <span>Provider : {{ currentProduct.provider }}</span>
    </div>
    <div class="product-info">
      <h2 class="product-title">{{ currentProduct.name }}</h2>
      <span class="product-price">$ {{ currentProduct.price }}, 00</span>
      <span class="product-desc">{{ currentProduct.description }}</span>
      <span class="product-stocked">{{ currentProduct.status }}</span> -
      <span class="product-stocked">{{ currentProduct.discounted ? "DISCOUNTED" : "NOT DISCOUNTED" }}</span>
      <span class="product-available">Available Number in Stock: {{ currentProduct.quantity }} </span>
      <btn
        :disabled="currentProduct.quantity == 0"
        btnColor="btn btn-large btn-sucess"
        :cartIcon="true"
        @click.native="addProductToCart(currentProduct)">
        Buy Now
      </btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import btn from './Btn';

export default {
  components: {
    btn,
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      currentProduct: 'getCurrentProduct',
    }),
  },

  created() {
    this.currentProductAction(this.id)
  },

  methods: {
    ...mapActions([
      'currentProductAction',
      'addProduct',
    ]),
    addProductToCart(product) {
      this.addProduct(product);
      product.quantity--
    }
  },

};
</script>

<style scoped>
  .product-box {
    width: 800px;
    height: 430px;
    margin: 50px auto;
    box-sizing: border-box;
    padding: 1.5em;
    background-color: #fff;
    border-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .product-image {
    width: 300px;
  }

  .product-info {
    width: 400px;
    align-self: flex-start;
  }

  .product-title {
    font-weight: normal;
  }

  .product-price {
    font-size: 2em;
    font-weight: bolder;
  }

  .product-desc {
    font-size: 1em;
    margin: 15px 0;
    display: block;
    line-height: 1.4;
  }
  .product-stocked {
    font-size: 1em;
    margin: 15px 0;
    line-height: 1.4;
    color: #27ae60;
  }

  .product-available {
    font-size: 1em;
    margin: 8px 0;
    display: block;
    color: #e74c3c;
  }

  .product-box button {
    width: 300px;
    margin: .3em 0;
  }
</style>
