<template>
    <div>
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
                    <input class="uk-input" type="text">
                  </label>
                </div>
                <div class="uk-width-1-1 uk-width-1-3@s">
                  <label>
                    <div class="uk-form-label uk-text-left">Cena</div>
                    <input class="uk-input" type="number" min="0">
                  </label>
                </div>
              </div>
              <div class="uk-grid-small uk-grid uk-child-width-1-1" uk-grid="">
                <div class="">
                  <label>
                    <div class="uk-form-label uk-text-left">Opis</div>
                    <input class="uk-input" type="text">
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
</template>

<script>
    export default {
      name: "EditProductWindow",
      props:['product'],
      data(){
        return{
          categoryDictionary: {
            group: [],
            categories: [],
            subcategories: [],
          },
          activeGroup: '',
          activeCategory: '',
          activeSubcategory: '',
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
      },
      methods:{

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
    }
</script>

<style scoped>

</style>
