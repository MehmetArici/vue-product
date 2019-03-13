import Vue from 'vue';
import Router from 'vue-router';
import AllProducts from '../components/AllProducts';
import AllSmartphones from '../components/AllSmartphones';
import AllNotebooks from '../components/AllNotebooks';
import Product from '../components/Product';
import CartCheckout from '../components/CartCheckout';
import Login from '../components/Login';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '',
      name: 'All Products',
      component: AllProducts,
    },
    {
      path: '/smartphones',
      name: 'Smartphones',
      component: AllSmartphones,
    },
    {
      path: '/notebooks',
      name: 'Notebooks',
      component: AllNotebooks,
    },
    {
      path: '/product-details/:id',
      name: 'Product',
      component: Product,
      props: true,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CartCheckout,
    },
  ],
});
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
