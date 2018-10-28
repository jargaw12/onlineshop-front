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
              <vk-icon-link class="mymargin" reset href="#" icon="minus" @click="minusQty(row.product.id)" ratio="0.5"></vk-icon-link>
              {{row.quantity }}
              <vk-icon-link class="mymargin" reset href="#" icon="plus" @click="plusQty(row.product.id)" ratio="0.6"></vk-icon-link>
            </span>
          </vk-table-column>
          <vk-table-column title="Razem">
            <div slot-scope="{ row }">{{computeSubTotal(row)}} zł</div>
          </vk-table-column>
          <vk-table-column title="">
            <span slot-scope="{row}">
              <vk-icon-link reset href="#" icon="close" @click="productRemove(row)"></vk-icon-link>
            </span>
          </vk-table-column>
        </vk-table>
        <hr>
        <h4>Łączna kwota: {{totalSumm}} zł </h4>

      </div>
      <br><br>
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
      <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="toPayment">Zrealizuj zamówienie <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
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
  // import axios from 'axios';
  // import store from "../store";
  export default {
    name: 'ShoppingCart',
    data() {
      return {
        totalPages:0,
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
      productRemove (row) {
        const prod=this.productPosition.find(p => p.product.id === row.product.id);
        this.$http.delete('/shoppingcart/'+ prod.product.id)
          .then(response => {
            this.$store.commit('minus', row.quantity);
            this.$delete(this.productPosition, row.__vkTable_rowId)
          })
          .catch(e => {
            console.log('Nie można usunąć produktu z listy');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      plusQty: function(id){

        this.$http.post('/shoppingcart/'+ id, 1)
          .then(response => {
            this.productPosition.find(p => p.product.id === id).quantity+=1;
            this.$store.commit('plus', 1);
            console.log("Zwiększono produkt nr: " +  id)
          })
          .catch(e => {
            console.log('Nie można powiększyć produktu');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })

      },
      minusQty: function(id){
        const prod=this.productPosition.find(p => p.product.id === id);
        if (prod.quantity > 1){
          this.$http.post('/shoppingcart/'+ id, -1)
            .then(response => {
              this.$store.commit('minus', 1);
              prod.quantity-=1;
            })
            .catch(e => {
              console.log('Nie można zmniejszyc produktu');
              console.log("Error: " + e);
              console.log("Error: " + e.response);
              this.errors.push(e.response)
            })
        }
      },
      toPayment(){
        this.$router.push({name: "OrderAndPayment"})
      }
    },
    filters: {
      priceFormat: function (value) {
        if (!value) return '';
        // value = value.toString();
        return value.toFixed(2).replace(".",",");
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
      // this.productPosition=this.pr1;
      this.$http.get('/shoppingcart')
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
