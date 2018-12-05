<template>
  <div class="uk-container">
    <br>
    <div>
      <table class="uk-table uk-table-divider uk-table-responsive uk-text-left">
        <thead>
        <tr>
          <th class="uk-text-nowrap">Nazwa</th>
          <th class="uk-table-expand">Opis</th>
          <th class="uk-table-shrink">Cena</th>
          <th class="uk-width-small">Akcje</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product,index) in products">
          <td class="uk-text-nowrap">{{product.name}}</td>
          <td class="uk-table-expand">{{product.description}}</td>
          <td class="uk-table-shrink">{{product.price|priceFormat}}</td>
          <td class="uk-width-small">
            <ul class="uk-iconnav">
              <li><a href="#editProduct" @click="editProduct(index)" uk-toggle uk-icon="icon: pencil" uk-tooltip="title: Edytuj; delay: 400"></a>
              </li>
              <li><a uk-icon="icon: close" @click="removeProduct(index)" uk-tooltip="title: Usuń; delay: 400"></a></li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
      <vk-pagination align="right" :page.sync="pageNumber" :perPage.sync="pageSize" :total.sync="pageTotal">
        <vk-pagination-page-prev></vk-pagination-page-prev>
        <vk-pagination-pages></vk-pagination-pages>
        <vk-pagination-page-next></vk-pagination-page-next>
      </vk-pagination>
    </div>

    <div class="uk-margin-small">
      <a class="uk-button uk-button-secondary uk-align-right@m" href="#addProduct" uk-toggle>Dodaj nowy produkt <span
        uk-icon="icon: plus; ratio:0.8"></span></a>
    </div>

    <div id="editProduct" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Edytuj produkt</h2>
        </div>
        <div class="uk-modal-body">
          <form class="uk-form-stacked">
            <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
              <fieldset class="uk-fieldset">
                <div class="uk-grid-small uk-grid" uk-grid="">
                  <div class="uk-width-1-1 uk-width-2-3@s">
                    <label>
                      <div class="uk-form-label uk-text-left">Nazwa</div>
                      <input class="uk-input" type="text"  v-model="activeProduct.name">
                    </label>
                  </div>
                  <div class="uk-width-1-1 uk-width-1-3@s">
                    <label>
                      <div class="uk-form-label uk-text-left">Cena</div>
                      <input class="uk-input" type="number" min="0" v-model="activeProduct.price">
                    </label>
                  </div>
                </div>
                <div class="uk-grid-small uk-grid uk-child-width-1-1" uk-grid="">
                  <div class="">
                    <label>
                      <div class="uk-form-label uk-text-left">Opis</div>
                      <input class="uk-input" type="text" v-model="activeProduct.description">
                    </label>
                  </div>
                </div>
                <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-3@s uk-grid" uk-grid="">
                    <div>
                      <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                        <select class="uk-select" v-model="activeGroup">
                          <option value="">Grupa</option>
                          <option v-for="(value, index) in this.categoryDictionary.group" :value="index">{{value.name}}</option>
                        </select>
                        <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1">
                          <span></span>
                          <span uk-icon="icon: chevron-down"></span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                        <select class="uk-select" v-model="activeCategory" :disabled=selectDisabled.categories>
                          <option value="">Kategoria</option>
                          <option v-for="(value, index) in this.categoryDictionary.categories" :value="index">
                            {{value.categoryname.name}}
                          </option>
                        </select>
                        <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1"
                                :disabled=selectDisabled.categories>
                          <span></span>
                          <span uk-icon="icon: chevron-down"></span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                        <select class="uk-select" v-model="activeSubcategory" :disabled=selectDisabled.subcategories>
                          <option value="">Podkategoria</option>
                          <option v-for="(value, index) in this.categoryDictionary.subcategories" :value="value.id">
                            {{value.subcategoryname.name}}
                          </option>
                        </select>
                        <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1"
                                :disabled=selectDisabled.subcategories>
                          <span></span>
                          <span uk-icon="icon: chevron-down"></span>
                        </button>
                      </div>
                    </div>

                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Anuluj</button>
          <button class="uk-button uk-button-secondary" @click="" type="button">Zapisz</button>
        </div>
      </div>
    </div>

    <div id="addProduct" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Dodaj produkt</h2>
        </div>
        <div class="uk-modal-body">
          <form class="uk-form-stacked">
            <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
              <fieldset class="uk-fieldset">
                <div class="uk-grid-small uk-grid" uk-grid="">
                  <div class="uk-width-1-1 uk-width-2-3@s">
                    <label>
                      <div class="uk-form-label uk-text-left">Nazwa</div>
                      <input class="uk-input" type="text" v-model="product.name">
                    </label>
                  </div>
                  <div class="uk-width-1-1 uk-width-1-3@s">
                    <label>
                      <div class="uk-form-label uk-text-left">Cena</div>
                      <input class="uk-input" type="number" min="0" v-model="product.price">
                    </label>
                  </div>
                </div>
                <div class="uk-grid-small uk-grid uk-child-width-1-1" uk-grid="">
                  <div class="">
                    <label>
                      <div class="uk-form-label uk-text-left">Opis</div>
                      <input class="uk-input" type="text" v-model="product.description">
                    </label>
                  </div>
                </div>
                <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-3@s uk-grid" uk-grid="">
                  <div>
                    <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                      <select class="uk-select" v-model="activeGroup">
                        <option value="">Grupa</option>
                        <option v-for="(value, index) in this.categoryDictionary.group" :value="index">{{value.name}}</option>
                      </select>
                      <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1">
                        <span></span>
                        <span uk-icon="icon: chevron-down"></span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                      <select class="uk-select" v-model="activeCategory" :disabled=selectDisabled.categories>
                        <option value="">Kategoria</option>
                        <option v-for="(value, index) in this.categoryDictionary.categories" :value="index">
                          {{value.categoryname.name}}
                        </option>
                      </select>
                      <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1"
                              :disabled=selectDisabled.categories>
                        <span></span>
                        <span uk-icon="icon: chevron-down"></span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div uk-form-custom="target: > * > span:first-child" class="select-custom">
                      <select class="uk-select" v-model="activeSubcategory" :disabled=selectDisabled.subcategories>
                        <option value="">Podkategoria</option>
                        <option v-for="(value, index) in this.categoryDictionary.subcategories" :value="value.id">
                          {{value.subcategoryname.name}}
                        </option>
                      </select>
                      <button class="uk-button uk-button-default selectBtn" type="button" tabindex="-1"
                              :disabled=selectDisabled.subcategories>
                        <span></span>
                        <span uk-icon="icon: chevron-down"></span>
                      </button>
                    </div>
                  </div>

                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Anuluj</button>
          <button class="uk-button uk-button-secondary" @click="saveProduct" type="button">Dodaj</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddProduct",
    data() {
      return {
        book: [
          {
            id: 1,
            name: 'Spodnie',
            address: 'Spodnie chinos',
            fullName: '49,99',
          },
          {
            id: 2,
            name: 'Bluza',
            address: 'Bluza z kapturem',
            fullName: '85,60',
          }
        ],
        activeProduct:0,
        products:[],
        pageTotal:0,
        pageNumber:1,
        pageSize:10,
        order:null,
        selectDisabled: {
          categories: true,
          subcategories: true
        },
        categoryDictionary: {
          group: [],
          categories: [],
          subcategories: [],
        },
        activeGroup: '',
        activeCategory: '',
        activeSubcategory: '',
        product: {
          name: '',
          description: '',
          price: '',
          image: "https://dummyimage.com/762x1100/eef1f5/ffffff&text=Product+image",
          subcategoryid: null,
        }
      }
    },
    watch: {
      activeGroup: function (newQuestion, oldQuestion) {
        if (newQuestion !== '') {
          this.categoryDictionary.categories = this.categoryDictionary.group[this.activeGroup].categories;
          this.selectDisabled.categories = false;
          this.activeCategory = '';
          this.selectDisabled.subcategories = true;
        }
      },
      activeCategory: function (newQuestion, oldQuestion) {
        if (newQuestion !== '') {
          this.categoryDictionary.subcategories = this.categoryDictionary.categories[this.activeCategory].subcategories;
          this.selectDisabled.subcategories = false;
        }
      },
      pageNumber:function (newQuestion, oldQuestion) {
        this.changePage();
      }
    },
    methods: {
      removeProduct(id){
        console.log("Removing", id);
        this.$http.delete('/products/delete/' + id)
          .then(response => {
            this.products.splice(id,1);
            this.getPage();
          })
          .catch(e => {
            console.log("Error: " + e);
          });
      },
      editProduct(index){
        this.activeProduct=this.products[index];
        // this.activeSubcategory=this.activeProduct.subcategoryid;
      },
      saveProduct() {
        if (this.activeSubcategory != null) {
          this.product.subcategoryid = this.activeSubcategory;
          this.$http.post('/products/product', this.product)
            .then(response => {
              console.log("add product 1 ");
              this.categoryDictionary.group = response.data;
              console.log("add product 2" + response.data);
            })
            .catch(e => {
              console.log("add product error: " + e);
            });
        }
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            alert('Form Submitted!');
            return;
          }

          alert('Correct them errors!');
        });
      },
      getPage(){
        this.$http.get('/products/all' ,{ params: { page: this.pageNumber, size:this.pageSize} })
          .then(response => {
            this.pageTotal=response.data.totalElements;
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
    filters: {
      priceFormat: function (value) {
        if (!value) return '';
        // value = value.toString();
        return value.toFixed(2).replace(".",",");
      }
    },
    created() {
      this.$http.get('/menu/groups')
        .then(response => {
          this.categoryDictionary.group = response.data;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      this.getPage();
    },
  }
</script>

<style scoped>
  img {
    max-height: 600px;
  }
  .uk-button.selectBtn{
    padding-left: 20px;
    padding-right: 20px;
    width: inherit;
  }
  .select-custom{
    width: -webkit-fill-available;
  }
  /*button{*/
  /*min-width: 160px;*/
  /*}*/
  .error-message {
    margin-top: 0px;
    color: #f0506e;
  }
</style>
