<template>
  <div>
    <br>
    <div class="uk-child-width-1-4@m" >
      <div v-for="p in products">
        <div class="uk-card uk-card-default">
          <div class="uk-card-media-top">
            <img :src="p.image" alt="">
          </div>
          <div class="uk-card-body">
            <h3 class="uk-card-title">{{p.name}}</h3>
            <p>{{p.description}}</p>
            <span><p class="price">{{p.price}} zł</p>
              <a class="uk-icon-button uk-margin-small-right" ratio="1.2" uk-icon="plus"></a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <br>
    <ul class="uk-pagination" uk-margin>
      <li><a href="#"><span uk-pagination-previous></span></a></li>
      <li><a href="#">1</a></li>
      <li class="uk-disabled"><span>...</span></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li><a href="#">6</a></li>
      <li class="uk-active"><span>7</span></li>
      <li><a href="#">8</a></li>
      <li><a href="#">9</a></li>
      <li><a href="#">10</a></li>
      <li class="uk-disabled"><span>...</span></li>
      <li><a href="#">20</a></li>
      <li><a href="#"><span uk-pagination-next></span></a></li>
    </ul>
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ProductList2',
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

    },
    methods:{
      productAdd (n) {
        console.log("asdasd")
        this.$emit('add', n)
      },
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
        .get(`/products`)
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
