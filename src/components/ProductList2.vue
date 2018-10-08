<template>
  <div>
    <br>
    <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid>
      <div v-for="p in products">
        <div class="uk-card uk-card-default">
          <div class="uk-card-media-top">
            <img :src="p.image" alt="">
          </div>
          <div class="uk-card-body">
            <div>
              <h4 class="uk-text-truncate">{{p.name}}</h4>
            </div>
            <div>
              <p class=" uk-text-truncate">{{p.description}}</p>
            </div>
            <div>
              {{p.price}} zł
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <ul class="uk-pagination" uk-margin v-if="numberOfPages<7 && numberOfPages>1">
      <li><a href="#"><span uk-pagination-previous></span></a></li>
      <li class="page" v-for="page in (1,numberOfPages)"><a @click="changePage(page)" href="#">{{page}}</a></li>
      <li><a href="#"><span uk-pagination-next></span></a></li>
    </ul>
    <ul class="uk-pagination" uk-margin v-if="numberOfPages>6">
      <li><a href="#"><span uk-pagination-previous></span></a></li>
      <li v-for="page in (1,3)"><a href="#">{{page}}</a></li>
      <li class="uk-disabled"><span>...</span></li>
      <li class="page"><a href="#">{{numberOfPages-2}}</a></li>
      <li class="page"><a href="#">{{numberOfPages-1}}</a></li>
      <li class="page"><a href="#">{{numberOfPages}}</a></li>
      <li class="page"><a href="#"><span uk-pagination-next></span></a></li>
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
        errors: [],
        pagesize:3,
        numberOfPages:0,
        activePage:1
      }
    },
    components: {

    },
    created() {
      console.log('create');

      const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers:{
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        }
      });

      api
        .get(`/productlist`+'/page?number='+1+'&size='+this.pagesize)
        .then(response => {
          this.products = response.data.content;
          this.numberOfPages = response.data.totalPages;
          console.log('products');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })
    },
    methods: {

      add(p){
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
        });
        api.post('/shoppingcart', p.id)
          .then(response => {
            this.$emit('add', 1);
            console.log("Dodano produkt: " + p.name)
          })
          .catch(e => {
            console.log('Nie można dodac produktu' +p.name + "o id: " + p.id);
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      changePage(page){
        // $('.page').val().removeClass("active");
        // $('.page').val(page).addClass("active");
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        });

        api
          .get(`/productlist`+'/page?number='+page+'&size='+this.pagesize)
          .then(response => {
            this.products = response.data.content;
            console.log('products');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            this.errors.push(e.response)
          });
      }
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
