<template>
  <div>
    <br>
    <div class="uk-grid">
      <div class="uk-width-1-4@m">
        <section class="uk-card-small uk-card-body" type="blank"><h4 class="uk-margin-small-bottom">Categories</h4>
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
              <a class="uk-accordion-title" href="#">Rozmiar</a>
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
        <vk-breadcrumb>
          <vk-breadcrumb-item href="#">Item</vk-breadcrumb-item>
          <vk-breadcrumb-item href="#">Item</vk-breadcrumb-item>
          <vk-breadcrumb-item>Active</vk-breadcrumb-item>
        </vk-breadcrumb>
        <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pagesTotal">
          <vk-pagination-page-prev></vk-pagination-page-prev>
          <vk-pagination-pages></vk-pagination-pages>
          <vk-pagination-page-next></vk-pagination-page-next>
        </vk-pagination>
        <hr>
        <div class="uk-margin">
          <select class="uk-select" v-model="pageSize">
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="8">8</option>
            <option :value="12">12</option>
          </select>
          <select class="uk-select" v-model="order">
          <option disabled="true">Sortuj</option>
          <option :value='{"by": "price", "dir":"desc"}'>Cena malejąco</option>
          <option :value='{"by": "price", "dir":"asc"}'>Cena rosnąco</option>
          <option :value='{"by": "name", "dir":"desc"}'>Nazwa malejąco</option>
          <option :value='{"by": "name", "dir":"asc"}'>Nazwa rosnąco</option>
          </select>
          <!--<select class="uk-select" v-model="orderBy">-->
            <!--<option disabled="true">Sortuj</option>-->
            <!--<option :value="price_desc">Cena malejąco</option>-->
            <!--<option :value="price_asc">Cena rosnąco</option>-->
            <!--<option :value="name_desc">Nazwa malejąco</option>-->
            <!--<option :value="price_asc">Nazwa rosnąco</option>-->
          <!--</select>-->
        </div>

        <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center uk-grid-divider" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 50; repeat: false">
          <div v-for="p in products">
            <product-card :p_id="p.id" :p_image="p.image" :p_description="p.description" :p_name="p.name" :p_price="p.price"></product-card>
          </div>
        </div>
      </div>
    </div >
    <br>
    <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pagesTotal">
      <vk-pagination-page-prev></vk-pagination-page-prev>
      <vk-pagination-pages></vk-pagination-pages>
      <vk-pagination-page-next></vk-pagination-page-next>
    </vk-pagination>
   <!--<pagitation :number-of-pages="this.numberOfPages"></pagitation>-->
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProductCard from "./ProductCard";
  import Pagitation from "./Pagitation";
  // import router from '../router'
  export default {
    name: 'ProductList2',
    data() {
      return {
        products: [],
        errors: [],
        // orderBy:{
        //   order,
        //   dir,
        // },
          pageSize:3,
          pageNumber:1,
          pagesTotal:0,
        order:{
          by:null,
          direction:null,
        }

        // pageSize:3,
        // activePage:1,
        // totalPages:0,
      }
    },
    components: {
      Pagitation,
      ProductCard

    },
    created() {
      console.log("Params: " +this.$route.params);
      console.log("Query: " +this.$route.query);

      console.log('create');

      this.pageNumber=Number(this.$route.query.page);
      this.pageSize=Number(this.$route.query.size);
      // this.$route.query.order!=null ? this.order.by=Number(this.$route.query.order) : this.order.by=null;
      // this.$route.query.dir!=null ? this.order.dir=Number(this.$route.query.dir) :  this.order.dir=null;
      // this.products=this.pr1;

      this.$http.get(`/productlist`,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
        .then(response => {
          this.products = response.data.content;
          this.numberOfPages = response.data.totalPages;
          this.pagesTotal=response.data.totalElements;
          console.log('products');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          // this.errors.push(e.response)
        })
    },
    methods: {
      changePage(page){
        this.$http.get(`/productlist`,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
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
    watch:{
      pageNumber: function () {
        this.$http
          .get(`/productlist`,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
          .then(response => {
            this.products = response.data.content;
            console.log('products');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            this.errors.push(e.response)
          });
        this.$router.push({path: 'list', query: { page: this.pageNumber, size: this.pageSize }});
      },
      pageSize : function () {
        this.$http
          .get(`/productlist`,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
          .then(response => {
            this.products = response.data.content;
            console.log('products');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            this.errors.push(e.response)
          });
        this.pageNumber=1;
        this.$router.push({path: 'list', query: { page: this.pageNumber, size: this.pageSize }});
      },
      order : function () {
        this.$http
          .get(`/productlist`,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
          .then(response => {
            this.products = response.data.content;
            console.log('products');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            this.errors.push(e.response)
          });
        this.$router.push({path: 'list', query: { page: this.pageNumber, size: this.pageSize, order: this.order.by, dir: this.order.dir }});
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
