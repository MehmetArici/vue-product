<template>
  <div class="box">
    <span v-if="!hasProduct()">No products :/</span>
    <div v-for="(product, index) in cartProducts"  :key="index" class="box-item">
      <img :src="product.value.imageUrl" alt="" class="item-thumb">
      <h3 class="item-name">{{ product.value.name }}</h3>
      <span class="item-amount">Amount: {{ product.count }}</span>
      <span class="item-price">R$ {{ product.value.price }}, 00</span>
    </div>
    <div class="cart-info" v-if="hasProduct()">
      <span>Total: $ {{ totalPrice() }}, 00</span>
      <router-link to="/checkout">
        <btn btnColor="btn btn-small btn-info"
          @click.native="showPopupCart()">
          View cart
        </btn>
      </router-link>
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
  data() {
    return {
      cartProducts: []
    }
  },
  methods: {
    ...mapActions([
      'showOrHiddenPopupCart',
    ]),
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    showPopupCart() {
      this.showOrHiddenPopupCart();
    },
    compressArray(original) {
      let compressed = [];

      let copy = original.slice(0);

      for (let i = 0; i < original.length; i++) {
        let myCount = 0;
        for (let w = 0; w < copy.length; w++) {
          if (original[i] === copy[w]) {
            myCount++;
            delete copy[w];
          }
        }

        if (myCount > 0) {
          let a = Object();
          a.value = original[i];
          a.count = myCount;
          compressed.push(a);
        }
      }

      return compressed;
      },
  },
  async created() {
    this.cartProducts = this.compressArray(this.getProductsInCart);
  },
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
  },
};
</script>

<style scoped>
  .box {
    width: 400px;
    height: auto;
    background-color: #FAFAFA;
    box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1em .5em;
    position: absolute;
    z-index: 1;
  }

  .box:after {
    content: '';
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    background: inherit;
    position: absolute;
    top: -15px;
    right: 15px;
  }

  .box-item {
    width: 100%;
    height: 130px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 .5em;
    margin-top: .3em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .item-thumb {
    max-width: 70%;
    grid-column: 1/2;
    grid-row: 1/4;
    align-self: center;
  }

  .item-name {
    grid-column: 2/4;
    grid-row: 1/2;
    font-weight: normal;
  }

  .item-amount {
    grid-column: 2/3;
    grid-row: 2/4;
    color: #ddd;
  }

  .cart-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
