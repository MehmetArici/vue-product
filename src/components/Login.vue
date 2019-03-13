<template>
    <div class="product-box">
        <div class="product-info">
            <form @submit.prevent="handleSubmit">
              <div v-if="error.error_description" class="invalid-feedback">{{ error.error_description }}</div>
              <h2 class="product-title">Welcome Back</h2>
                <div class="form-group">
                    <input type="text" v-model="username" name="username" class="form-control" placeholder="Username" :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                    <input type="password" v-model="password" name="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                </div>
                <btn btnColor="btn btn-large btn-info">
                    Login
                </btn>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import btn from './Btn';

    export default {
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },

        components: {
            btn,
        },

        computed: {
            ...mapGetters({
                currentProduct: 'getCurrentProduct',
                error: 'getError'
            }),
        },

      created () {
        // reset login status
        this.logout();
      },

        methods: {
            ...mapActions([
                'login',
                'logout',
                'addProduct',
            ]),
            handleSubmit() {
                this.submitted = true;
                const { username, password } = this;
                if (username && password) {
                    this.login({ username, password })
                }
            },
            addProductToCart(product) {
                this.addProduct(product);
            },
            rated(rate) {
                return `${rate * 20}%`;
            },
        },

    };
</script>

<style scoped>
    .form-control {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
    }

    .product-box {
        width: 800px;
        height: 400px;
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

    .product-box button {
        width: 200px;
        margin: .3em 0;
    }
</style>
