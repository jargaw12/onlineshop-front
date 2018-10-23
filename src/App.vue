<template>
  <div id="app">
        <div class="uk-container">
          <hea></hea>
          <router-view/>
        </div>
        <!--<foo></foo>-->
      </div>
</template>


<script>
  import Foo from './components/MyFooter.vue'
  import Hea from './components/MyHeader.vue'
  import store from './store'
  import axios from 'axios'


  export default {
    name: 'App',
    components: {
      Foo,
      Hea,
    },
    store,
    data() {
      return {
      }
    },
    created() {
      const api = axios.create({
        baseURL: 'http://localhost:8080',
      });

      api.get('/shoppingcart/totalquantity')
        .then(response => {
          this.$store.state.count=response.data;
          console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
        })
        .catch(e => {
          console.log("Error: " + e);
        })
    }
  }
</script>

<style>

</style>
