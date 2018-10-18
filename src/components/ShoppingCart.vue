<template>
  <div>
    <div>

      <div>
        <h3 class="uk-text-center">Twój koszyk</h3>
      </div>
      <br><br>
      <h6 class="center" v-if="!this.productPosition.length">Brak produktów w koszyku</h6>

      <div>

        <vk-table v-if="this.productPosition.length" responsive :data="this.productPosition" rowKey="id">
          <vk-table-column title="Produkt" cell="product.image">
            <img class="" slot-scope="{cell}" :src="cell" width="100" alt="" />
          </vk-table-column>
          <vk-table-column class="uk-visible@m" title="" cell="product.name"></vk-table-column>
          <vk-table-column title="Cena" cell="product.price">
            <div slot-scope="{cell}">{{cell | priceFormat}} zł</div>
          </vk-table-column>
          <vk-table-column title="Ilość">
            <span slot-scope="{row}">
              <vk-icon-link class="mymargin" reset href="#" icon="minus" @click="minusQty(row, row.id)" ratio="0.5"></vk-icon-link>
              {{row.quantity}}
              <vk-icon-link class="mymargin" reset href="#" icon="plus" @click="plusQty(row, row.id)" ratio="0.6"></vk-icon-link>
            </span>
          </vk-table-column>
          <vk-table-column title="Razem">
            <div slot-scope="{ row }">{{ row.quantity * row.product.price | priceFormat}} zł</div>
          </vk-table-column>
          <vk-table-column title="" cell="">
            <vk-icon-link reset href="#" icon="close" @click="productRemove(item, index)"></vk-icon-link>
          </vk-table-column>
        </vk-table>

      </div>
      <br><br>
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
      <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center">Płatność <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
      </div>
      <!--<div class="center">-->
        <!--<a class="waves-effect btn-large grey white-text"><i class="material-icons right">navigate_next</i>Przejdź do platnosci</a>-->
      <!--</div>-->
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'ShoppingCart',
    data() {
      return {
        total:0,
        productPosition: [],
        errors: [],
        pr1:[{
          product:{id:1,
            image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg",
            description: "Bawełniane spodnie",
            name: "Spodnie",
            price:100.90},
          quantity:2
        },{
          product:{id:1,
            image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg",
            description: "Bawełniane spodnie",
            name: "Spodnie",
            price:100.90},
          quantity:2
        },{
          product:{id:1,
            image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg",
            description: "Bawełniane spodnie",
            name: "Spodnie",
            price:100.90},
          quantity:2
        },{
          product:{id:1,
            image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg",
            description: "Bawełniane spodnie",
            name: "Spodnie",
            price:100.90},
          quantity:2
        },
        ],
      }
    },
    methods:{
      computeSubTotal: function(item) {
        return(parseFloat(item.product.price.toString().replace(",",".")) * parseFloat(item.quantity)).toFixed(2).replace(".",",");
      },
      productRemove (p, productId) {
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        });
        api.delete('/shoppingcart/'+ p.product.id)
          .then(response => {
             // this.$bus.$emit('remove', p.quantity);
            store.commit('minus', p.quantity);
            this.productPosition.splice(productId, p.quantity);
            console.log("Usunieto produkt nr: " + p.product.id)
          })
          .catch(e => {
            console.log('Nie można usunąć produktu z listy');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      plusQty: function(buy_data,productId){

        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        });
        api.patch('/shoppingcart/'+ buy_data.product.id, 1)
          .then(response => {
            buy_data.quantity=parseInt(buy_data.quantity) + parseInt(1);
            // this.$bus.$emit('add', 1);
            store.commit('plus', 1);
            console.log("Zwiększono produkt nr: " +  buy_data.id)
          })
          .catch(e => {
            console.log('Nie można powiększyć produktu');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })

      },
      minusQty: function(buy_data,productId){
        buy_data.quantity = parseInt(buy_data.quantity) - parseInt(1);
        // this.$bus.$emit('remove', 1)
        store.commit('minus', 1);
        if (buy_data.quantity < 1){
          buy_data.quantity = 1;
        }
        else {
          const api = axios.create({
            baseURL: 'http://localhost:8080',
            headers:{
              'Access-Control-Allow-Origin': 'http://localhost:8080',
            }
          });
          api.patch('/shoppingcart/'+ buy_data.product.id, -1)
            .then(response => {
              //this.$bus.$emit('remove', 1);
              store.commit('minus', 1);
              console.log("Zmniejszono produkt nr: " + buy_data.product.id)
            })
            .catch(e => {
              console.log('Nie można zmniejszyc produktu');
              console.log("Error: " + e);
              console.log("Error: " + e.response);
              this.errors.push(e.response)
            })
        }
      },
    },
    filters: {
      priceFormat: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      }
    },
    computed: {
      totalQuantity: function(){
        console.log(this.productPosition);
        return this.productPosition.reduce(function(total, item){
      
          return total + parseFloat(item.quantity);
        },0);
      },
      totalSumm: function(){
        return parseFloat(this.productPosition.reduce(function(total, item){
      
          return total + (parseFloat(item.quantity) * parseFloat(item.product.price));
        },0)).toFixed(2).replace(".",",");
      },
    },
    created() {
      this.productPosition=this.pr1;
      const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers:{
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        }
      });

      api
        .get('/shoppingcart')
  .then(response => {
    this.productPosition = response.data;
    console.log("Dodano liste produktów o długości: " + this.productPosition.length)
  })
    .catch(e => {
      console.log('error');
      console.log("Error: " + e);
      this.errors.push(e.response)
    })
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .mymargin{
    margin: 6px;
  }

  .product-image{
    width: 100px;
    height: 100px;
  }

  .qty-minus {
    float: left;
    line-height: 25px;
  }
  .qty {
    float: left;
    /*line-height: 100px;*/
    margin-left: 20px;
    margin-right: 20px;
  }
  .qty-plus {
    float: left;
    line-height: 25px;
  }

</style>
