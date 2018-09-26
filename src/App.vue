<template>

  <div id="app">
        <div class="uk-container">
          <hea :products="products"></hea>

          <router-view @add="add" @remove="remove"/>
        </div>
        <!--<foo></foo>-->
      </div>
</template>


<script>
  import axios from 'axios';
  import Foo from './components/MyFooter.vue'
  import Hea from './components/MyHeader.vue'

  export default {
    name: 'App',
    components: {
      Foo,
      Hea,
    },
    data() {
      return {
        products: 0
      }
    },
    methods: {
      add(n) {
        this.products = this.products + n;
      },
      remove(n) {
        this.products = this.products - n;
      }
    },
    created() {
      console.log('create');
      const api = axios.create({
        baseURL: 'http://localhost:8080',
      });

      api.get('/shoppingcart/totalquantity')
        .then(response => {
          this.products = response.data;

        })
        .catch(e => {
          console.log("Error: " + e);
        })
    }
  }
</script>

<style>

</style>
