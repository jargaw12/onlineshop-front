<template>
  <div class="uk-container">
    <br>
    <hr>
    <div class="uk-grid">
      <div class="uk-width-expand@m">
        <div class="uk-child-width-1-4@s uk-text-center" uk-grid>
          <div>
            <div uk-form-custom="target: > * > span:first-child" class="uk-width-1-1">
              <select class="uk-select uk-width-1-1" v-model="pageSize">
                <option :value="4">4</option>
                <option :value="8">8</option>
                <option :value="12">12</option>
              </select>
              <button class="uk-button uk-button-default uk-width-1-1" type="button" tabindex="-1">
                <span></span>
                <span uk-icon="icon: chevron-down"></span>
              </button>
            </div>
          </div>
          <div>
            <div uk-form-custom="target: > * > span:first-child" class="uk-width-1-1">
              <select class="uk-select uk-width-1-1" v-model="order">
                <option :value='{"by": null, "dir":null}'>Sortuj</option>
                <option :value='{"by": "price", "dir":"desc"}'>Cena malejąco</option>
                <option :value='{"by": "price", "dir":"asc"}'>Cena rosnąco</option>
                <option :value='{"by": "name", "dir":"desc"}'>Nazwa malejąco</option>
                <option :value='{"by": "name", "dir":"asc"}'>Nazwa rosnąco</option>
              </select>
              <button class="uk-button uk-button-default uk-width-1-1" type="button" tabindex="-1">
                <span></span>
                <span uk-icon="icon: chevron-down"></span>
              </button>
            </div>
          </div>
          <div></div>
          <div>
            <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pageTotal">
              <vk-pagination-page-prev></vk-pagination-page-prev>
              <vk-pagination-pages></vk-pagination-pages>
              <vk-pagination-page-next></vk-pagination-page-next>
            </vk-pagination>
          </div>
        </div>
        <hr>

        <div v-if="pageTotal>0" class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-center uk-grid-divider" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 100; repeat: false">
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
  import ProductCard from "../components/ProductCard";
  import Pagitation from "../components/Pagitation";
  export default {
    name: 'ProductList',
    data() {
      return {
        products: [],
        errors: [],
        group:undefined,
        category:undefined,
        subcategory:undefined,
        list:[],
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
          if(newValue.by!==null && newValue.dir!==null) {
            this.$store.commit('setPageNumber', 1);
            this.$store.commit('setSortSettings', newValue);
            this.$router.push({
              name: 'Product List',
              path: this.pathString,
              query: {page: this.pageNumber, size: this.pageSize, order: newValue.by, dir: newValue.dir}
            });
            this.getPage();
          }
        }
      },
      path(){
        var path = '/products/'+this.category.id;
        console.log("path_category: "+this.category.id)
        if(this.subcategory !== undefined) {
          path += '/' + this.subcategory.id;
          console.log("path_subcategory: "+this.subcategory.id)
        }
        return path;
      },
      pathString(){
        var path='/produkty/'+this.group.name.toLowerCase()+'/'+this.category.categoryname.name.toLowerCase();
        if(this.subcategory !== undefined)
          path+='/'+this.subcategory.subcategoryname.name.toLowerCase();
         return path.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      }
    },
    filters: {
      normalizeFormat: function (value) {
        if (!value) return '';
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }
    },

      created() {

    },
    methods: {
      setData(toParams){
        this.group=this.findGroup(toParams.group);
        console.log("gr: "+this.group);
        this.category=this.findCategory(toParams.group,toParams.category);
        console.log("cat: "+this.category);
        this.subcategory=this.findSubcategory(toParams.group,toParams.category, toParams.subcategory);
        console.log("sub: "+this.subcategory);

      },
      findGroup(groupName){
        return this.list
          .filter(group=>group.name.toLowerCase()===groupName)[0];
      },
      findCategory(groupName,categoryName){
        return this.list
          .filter(group=>group.name.toLowerCase()===groupName)[0].categories
          .filter(category=>category.categoryname.name.toLowerCase()===categoryName)[0];
      },
      findSubcategory(groupName,categoryName,subcategoryName){
        return this.list
          .filter(group=>group.name.toLowerCase()===groupName)[0].categories
          .filter(category=>category.categoryname.name.toLowerCase()===categoryName)[0].subcategories
          .filter(subcategory=>subcategory.subcategoryname.name.toLowerCase()===subcategoryName)[0];
      },
      getPage(){
        this.$http.get(this.path ,{ params: { page: this.pageNumber, size:this.pageSize, order:this.order.by, dir:this.order.dir } })
          .then(response => {
            this.pageTotal=response.data.totalElements;
            // this.$store.commit('setPageTotal',response.data.totalElements);
            this.products = response.data.content;
          })
          .catch(e => {
            console.log("Error: " + e);
          })
      },
      changePage(){
        this.getPage();
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$http.get('/menu/groups')
          .then(response => {
            vm.list = response.data;
            console.log("Productlist list ok: : " + vm.list);
            vm.setData(to.params, to.query);
            vm.getPage();
          })
          .catch(e => {
            console.log("Productlist list error: : " + e);
          });
      });
    },
    beforeRouteUpdate (to, from, next) {
      this.setData(to.params, to.query);
      this.getPage();
      next()
    },
  }
</script>

<style scoped>

</style>
