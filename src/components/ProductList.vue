<template>
  <div>
    <br>
    <div class="uk-grid">
      <div class="uk-width-1-4@m uk-box-shadow-small">
        <section class="uk-card-small uk-card-body"><h4 class="uk-margin-small-bottom">Categories</h4>
          <ul class="uk-nav uk-nav-default">
            <li><a href="subcategory.html">Laptops</a></li>
            <li><a href="subcategory.html">Tablets</a></li>
            <li><a href="subcategory.html">Peripherals</a></li>
            <li><a href="subcategory.html">Keyboards</a></li>
            <li><a href="subcategory.html">Accessories</a></li>
          </ul>
        </section>
        <section class="uk-card-small uk-card-body">
          <ul uk-accordion="multiple: true">
            <li class="uk-open">
              <a class="uk-accordion-title" href="#">Cena</a>
              <div class="uk-accordion-content">
                <form class="uk-form-stacked">
                  <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
                    <fieldset class="uk-fieldset uk-first-column">
                      <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
                        <div><label>
                          <div class="uk-form-label">Cena od</div>
                          <input class="uk-input" type="number" value="0" placeholder="Od"></label></div>
                        <div class="uk-grid-margin uk-first-column"><label>
                          <div class="uk-form-label">Cena do</div>
                          <input class="uk-input" type="number" value="999999" placeholder="Do"></label></div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </li>
            <li>
              <a class="uk-accordion-title" href="#">Marka</a>
              <div class="uk-accordion-content">
                <form class="uk-form-stacked">
                  <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
                    <fieldset class="uk-fieldset uk-first-column">
                      <ul class="uk-list">
                        <li>
                          <label><input class="uk-checkbox" type="checkbox"> Lenovo</label>
                        </li>
                        <li>
                          <label><input class="uk-checkbox" type="checkbox"> Dell</label>
                        </li>
                        <li>
                          <label><input class="uk-checkbox" type="checkbox"> Asus</label>
                        </li>
                      </ul>
                    </fieldset>
                  </div>
                </form>
              </div>
            </li>
            <li>
              <a class="uk-accordion-title" href="#">Kolor</a>
              <div class="uk-accordion-content">
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div class="uk-width-expand@m">
        <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid>
          <div v-for="p in products">
            <product-card :p_id="p.id" :p_image="p.image" :p_description="p.description" :p_name="p.name" :p_price="p.price"></product-card>
          </div>
        </div>
      </div>
    </div >
    <br>
   <pagitation :number-of-pages="this.numberOfPages"></pagitation>
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProductCard from "./ProductCard";
  import Pagitation from "./Pagitation";
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
      Pagitation,
      ProductCard

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
      },
    },
    computed: {
      filteredlist(){
        // filer() returns an array, filter((what) => { return the thing that includes the search keyword })
        return this.postslist.filter((post) => {
          return products.name.includes(this.searchkeyword);
        });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
