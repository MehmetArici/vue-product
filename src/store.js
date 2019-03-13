import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { router } from './router'

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {

    products: [],
    notebooks: [],
    smartphones: [],

    cartProducts: [],
    currentProduct: {},
    showPopupCart: false,

    user: {},

    error: {}
},

  getters: {
    getUser: state => state.user,
    getNotebooks: state => state.notebooks,
    getSmartphones: state => state.smartphones,
    getAllProducts: state => state.products,
    getProductsInCart: state => state.cartProducts,
    getCurrentProduct: state => state.currentProduct,
    getPopupCart: state => state.showPopupCart,
    getError: state => state.error
  },

  mutations: {
    ADD_PRODUCT: (state, product) => {
      state.cartProducts.push(product);
    },
    LOGIN: (state, credentials) => {
      state.cartProducts.push(product);
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    REMOVE_USER: (state) => {
      state.user = null;
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products
    },
    REMOVE_PRODUCT: (state, index) => {
      state.cartProducts.splice(index, 1);
    },
    CURRENT_PRODUCT: (state, product) => {
      state.currentProduct = product;
    },
    SET_NOTEBOOKS: (state, products) => {
      state.notebooks = products
    },
    SET_SMARTPHONES: (state, products) => {
      state.smartphones = products
    },
    SHOW_POPUP_CART: (state) => {
      state.showPopupCart = !state.showPopupCart;
    },
    SET_ERROR: (state, error) => {
      state.error = error;
    }
  },

  actions: {
     login: ({ commit }, credentials) => {
       axios
         .post(`${process.env.API_BASE_URL}oauth/token?grant_type=password&username=${credentials.username}&password=${credentials.password}` , {},{headers: {'Authorization': 'Basic c2ltcGxlLmNsaWVudDpzZWNyZXQ='}})
         .then(r => r.data)
         .then(user => {
           localStorage.setItem('user', JSON.stringify(user));
           router.push('/');
           commit('SET_USER', user)
         })
         .catch(error => {
           commit('SET_ERROR', error.response.data)
         });
     },
    logout: ({ commit }) => {
      localStorage.removeItem('user');
      commit('REMOVE_USER')
    },

    getAllAction: ({ commit }) => {
       let token = JSON.parse(localStorage.getItem('user')).access_token
      axios
        .get(`${process.env.API_BASE_URL}api/product/all`, {headers: {'Authorization': 'bearer' + token}})
        .then(r => r.data)
        .then(products => {
          commit('SET_PRODUCTS', products)
        })
        .catch(error => {
          if (error.response.status == "401") {
            router.push("/login")
          }
          commit('SET_ERROR', error.response.data)
        });
    },
    getNotebooksAction: ({ commit }) => {
      let token = JSON.parse(localStorage.getItem('user')).access_token;
      axios
        .get(`${process.env.API_BASE_URL}api/product/all/notebook`, {headers: {'Authorization': 'bearer' + token}})
        .then(r => r.data)
        .then(products => {
          commit('SET_NOTEBOOKS', products)
        })
        .catch(error => {
          if (error.response.status == "401") {
            router.push("/login")
          }
          commit('SET_ERROR', error.response.data)
        });
    },

    getSmartphonesAction: ({ commit }) => {
      let token = JSON.parse(localStorage.getItem('user')).access_token;
      axios
        .get(`${process.env.API_BASE_URL}api/product/all/smartphone`, {headers: {'Authorization': 'bearer' + token}})
        .then(r => r.data)
        .then(products => {
          commit('SET_SMARTPHONES', products)
        })
        .catch(error => {
          if (error.response.status == "401") {
            router.push("/login")
          }
          commit('SET_ERROR', error.response.data)
        });
    },
    addProduct: (context, product) => {
      context.commit('ADD_PRODUCT', product);
    },
    removeProduct: (context, index) => {
      context.commit('REMOVE_PRODUCT', index);
    },
    currentProductAction: ({ commit }, productId) => {
      let token = JSON.parse(localStorage.getItem('user')).access_token;
      axios
        .get(`${process.env.API_BASE_URL}api/product/${productId}`, {headers: {'Authorization': 'bearer' + token}})
        .then(r => r.data)
        .then(product => {
          commit('CURRENT_PRODUCT', product)
        })
        .catch(error => {
          if (error.response.status == "401") {
            router.push("/login")
          }
          commit('SET_ERROR', error.response.data)
        });
    },
    buyProducts: ({ commit }, products) => {
      let token = JSON.parse(localStorage.getItem('user')).access_token;
      for (let key in products) {
        axios
          .post(`${process.env.API_BASE_URL}api/product/buy`, {'productId': products[key].id}, {headers: {'Authorization': 'bearer' + token}})
          .then(r => r.data)
          .then(product => {
            commit('REMOVE_PRODUCT', product)
          })
          .catch(error => {
            if (error.response.status == "401") {
              router.push("/login")
            }
            commit('SET_ERROR', error.response.data)
          });
      }
    },
    showOrHiddenPopupCart: (context) => {
      context.commit('SHOW_POPUP_CART');
    },
  },
});
