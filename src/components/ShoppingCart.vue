<template>
  <div>
    <div>

      <div>
        <h3>Twój koszyk</h3>
      </div>
      <br><br>
      <h6 class="center" v-if="!productPosition.length">Brak produktów w koszyku</h6>

      <div>

        <table class="uk-table uk-table-responsive uk-table-divider">
          <thead>
          <tr>
            <th></th>
            <th>Produkt</th>
            <th>Cena</th>
            <th>Ilosc</th>
            <th>Razem</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="p in productPosition">
            <td><img  :src="p.product.image" class="product-image"/></td>
            <td>{{p.product.name}}</td>
            <td>{{p.product.price | priceFormat}} zł</td>
            <td>
              <a class="qty-minus" uk-icon="minus" v-on:click="minusQty(p)" ratio="0.5"></a>
              <div class="qty">{{p.quantity}}</div>
              <a class="qty-plus" uk-icon="plus" v-on:click="plusQty(p)" ratio="0.5"></a>
            </td>
            <td>{{computeSubTotal(p) | priceFormat}} zł</td>
            <td>
              <a uk-icon="close" @click="removeProduct(p.id) + productRemove(p.quantity)"></a>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th>Podsumowanie</th>
            <td></td>
            <td></td>
            <td>{{totalQuantity}}</td>
            <td>{{totalSumm | priceFormat}} zł</td>
            <td></td>
          </tr>
          </tfoot>
        </table>

      </div>
      <br><br>
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
      <button  class="uk-button uk-button-secondary uk-width-1-2">Płatność <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
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
        errors: []
      }
    },
    methods:{
      computeSubTotal: function(item) {
        return(parseFloat(item.product.price.toString().replace(",",".")) * parseFloat(item.quantity)).toFixed(2).replace(".",",");
      },
      removeProduct: function (index) {
        // this.productPosition.splice(index, 1)
      },
      productRemove (n) {
        this.$emit('remove', n)
        const api = axios.create({
          baseURL: 'http://localhost:8080',
        });

        api.delete('/shoppingcart',buy_data)
          .then(response => {
            this.productPosition.splice(index, 1);
            console.log('products: ' + products );
            console.log('response: ' + response.data );
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      plusQty: function(buy_data){
        buy_data.quantity=parseInt(buy_data.quantity) + parseInt(1);
        this.$emit('add', 1);

        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
      }
         });

        api.delete('/shoppingcart/1')
          .then(response => {
            this.products = response.data;
            console.log('products: ' + products );
            console.log('response: ' + response.data );
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      minusQty: function(buy_data){
        buy_data.quantity = parseInt(buy_data.quantity) - parseInt(1);
        this.$emit('remove', 1)
        if (buy_data.quantity < 1){
          buy_data.quantity = 1;
        }
        else {
          // axios.post('http//:localhost:8080/increment',buy_data)
          //   .then(response => {
          //     this.products = response.data;
          //     console.log('products: ' + products );
          //     console.log('response: ' + response.data );
          //   })
          //   .catch(e => {
          //     console.log('error');
          //     console.log("Error: " + e);
          //     console.log("Error: " + e.response);
          //     this.errors.push(e.response)
          //   })
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
      console.log('create');
      const api = axios.create({
        crossDomain : true,
        baseURL: 'https://7f887a6b-a5cb-47cd-b34f-bf2f30ef8b46.mock.pstmn.io',
        headers: {'x-api-key': '57c13c85d2f0409ca423e2f9772d8503',
          'Cache-Control': 'no-cache',
          'Postman-Token': 'f12715bc-c2b9-4a76-9aae-b19d0f281bb0'}});

      api
        .get('/productsInCart')
  .then(response => {
    this.productPosition = response.data;
    console.log('productPosition');
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
  .price{
    text-align: right;
    max-width: 10%;
  }

  .quantity{
    text-align: right;
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

  .clear{
    cursor: pointer;
  }

  .total{
    cursor:default;
  }
</style>
