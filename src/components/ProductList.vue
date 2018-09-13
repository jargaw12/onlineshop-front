<template>
  <div class="productList">
    <form action="#">
      <p>
        <label>
          <input type="checkbox" class="filled-in" />
          <span>0-160</span>
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" class="filled-in" />
          <span>161-220</span>
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" class="filled-in" />
          <span>221-300</span>
        </label>
      </p>
    </form>

    <div class="section">
      <div class="row">
        <div class="col s12 m6 l4" v-for="p in products">
          <product-card :p_name="p.name" :p_description="p.description" :p_price="p.price" :p_image="p.image"></product-card>
        </div>
      </div>
    </div>

    <section class="pages">
      <div class="row">
        <div>
          <ul class="pagination">
            <li class="disabled">
              <a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ProductCard from './ProductCard.vue'
  import axios from 'axios';
  export default {
    name: 'ProductList',
    data() {
      return {
        filters:{
          orderBy: '',
          showPostsPerPage: 2,
          filterBy: 'someCategory'
        },
        products: [],
        errors: []
      }
    },
    components: {
      ProductCard,
    },
    created() {
      console.log('create');
      const api = axios.create({
        crossDomain : true,
        baseURL: `https://7f887a6b-a5cb-47cd-b34f-bf2f30ef8b46.mock.pstmn.io`,
        headers: {'x-api-key': '57c13c85d2f0409ca423e2f9772d8503',
          'Cache-Control': 'no-cache',
          'Postman-Token': 'f12715bc-c2b9-4a76-9aae-b19d0f281bb0'}});

      api
        .get(`/products`, {
        })
        .then(response => {
          this.products = response.data;
          console.log('products');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })
    },
    computed: {
      filteredlist(){
        // filer() returns an array, filter((what) => { return the thing that includes the search keyword })
        return this.postslist.filter((post) => {
          return post.title.includes(this.searchkeyword);
        });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
