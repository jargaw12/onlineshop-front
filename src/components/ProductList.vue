<template>
  <div class="uk-container">
    <br>
    <div class="uk-grid">
      <div class="uk-width-1-4@m">
        <section class="uk-card-small uk-card-body" type="blank">{{category.categoryname.name}}<h4 class="uk-margin-small-bottom"></h4>
          <ul class="uk-nav uk-nav-default">
            <li v-for="s in category.subcategories">
              <a @click="changeSubcategory(s.id)">{{s.name}}</a>
            </li>
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
        <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pageTotal">
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
        </div>

        <div v-if="pageTotal>0" class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center uk-grid-divider" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 50; repeat: false">
          <div v-for="p in products">
            <product-card :p_id="p.id" :p_image="p.image" :p_description="p.description" :p_name="p.name" :p_price="p.price"></product-card>
          </div>
        </div>
        <div v-else>
          <h4 class="uk-text-center">Brak produktów</h4>
        </div>
      </div>
    </div >
    <br>
    <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pageTotal">
      <vk-pagination-page-prev></vk-pagination-page-prev>
      <vk-pagination-pages></vk-pagination-pages>
      <vk-pagination-page-next></vk-pagination-page-next>
    </vk-pagination>
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProductCard from "./ProductCard";
  import Pagitation from "./Pagitation";
  // import router from '../router'
  export default {
    name: 'ProductList',
    data() {
      return {
        products: [],
        errors: [],

      }
    },
    components: {
      Pagitation,
      ProductCard

    },
    computed: {
      pageTotal:{
        get: function () {
          return this.$store.state.page.total;
        },
        set: function (newValue) {
          this.$store.commit('setPageTotal',newValue);
        }
      },
      pageNumber:{
        get: function () {
          return this.$store.state.page.number;
        },
        set: function (newValue) {
          this.$store.commit('setPageNumber',newValue);
          this.$router.push({name:'Product List',path :this.pathString, query: { page: newValue, size: this.pageSize, order: this.order.by, dir: this.order.dir}});
          this.getPage();
        }
      },
      pageSize:{
        get: function () {
          return this.$store.state.page.size;
        },
        set: function (newValue) {
          this.$store.commit('setPageNumber',1);
          this.$store.commit('setPageSize',newValue);
          this.$router.push({name:'Product List',path :this.pathString, query: { page: this.pageNumber, size: newValue, order: this.order.by, dir: this.order.dir}});
          this.getPage();
        }
      },
      order:{
        get: function () {
          return this.$store.state.page.order;
        },
        set: function (newValue) {
          this.$store.commit('setPageNumber',1);
          this.$store.commit('setSortSettings',newValue);
          this.$router.push({name:'Product List',path :this.pathString, query: { page: this.pageNumber, size: this.pageSize, order: newValue.by, dir: newValue.dir}});
          this.getPage();
        }
      },
      category() {
        return this.$store.getters.getCategory
      },
      group(){
        return this.$store.getters.getGroup
      },
      subcategory(){
        return this.$store.getters.getSubcategory
      },
      path(){
       var path = '/products/'+this.category.id;
        if(this.subcategory !== undefined)
          path+='/'+this.subcategory.id;
         return path;
      },
      pathString(){
        var path='/'+this.group.name.toLowerCase()+'/'+this.category.categoryname.name.toLowerCase();
        if(this.subcategory !== undefined)
          path+='/'+this.subcategory.name.toLowerCase();
         return path.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      }
    },
    created() {
      this.$store.commit('setPageNumber',Number(this.$route.query.page));
      this.$store.commit('setPageSize',Number(this.$route.query.size));
      this.getPage();
    },
    methods: {
      getPage(){
        this.$http.get(this.path ,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
          .then(response => {
            this.$store.commit('setPageTotal',response.data.totalElements);
            this.products = response.data.content;
          })
          .catch(e => {
            console.log("Error: " + e);
          })
      },
      changePage(){
        this.getPage();
      },
      changeSubcategory(subcategory){
        // this.$store.commit('setPageNumber',1);
        this.$store.commit('setActiveSubcategory', subcategory);
        // this.$router.push({name:'Product List',path :this.pathString, query: { page: 1, size: this.pageSize, order: this.order.by, dir: this.order.dir}});
        this.$router.push({name:'Product List',params:{group:this.group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") ,category: this.category.categoryname.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),subcategory: this.subcategory.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}, query: { page: 1, size: this.pageSize, order: this.order.by, dir: this.order.dir}});
        // this.getPage();
      },
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.commit('setPageNumber',Number(to.query.page));
      this.$store.commit('setPageSize',Number(to.query.size));
      this.$store.commit('setSortSettings',{by:to.query.order,dir:to.query.dir});
      this.getPage();
      next()
    },
  }
</script>

<style scoped>

</style>
