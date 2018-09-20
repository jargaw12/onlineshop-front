<template>
  <div class="section">
    <div class="row">

      <div>
        <h3 class="center grey-text darken-4">Twój koszyk</h3>
      </div>
      <br><br>
      <h6 class="center" v-if="!productPosition.length">Brak produktów w koszyku</h6>

      <div>
        <table class="full" v-if="($mq === 'laptop' || $mq === 'desktop') && productPosition.length">
          <thead>
          <tr>
            <th></th>
            <th>Produkt</th>
            <th class="price">Cena</th>
            <th class="center">Ilosc</th>
            <th class="price">Razem</th>
            <th class="price"></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="p in productPosition">
            <td><img :src="p.product.image" class="product-image"/></td>
            <td class="pName">{{p.product.name}}</td>
            <td class="price">{{p.product.price | priceFormat}} zł</td>
           <td>
             <div class="qty-minus" v-on:click="minusQty(p)+ productRemove(1)">-</div>
             <div class="qty">{{p.quantity}}</div>
             <div class="qty-plus" v-on:click="plusQty(p) + productAdd(1)">+</div>
           </td>
            <td class="price">{{computeSubTotal(p) | priceFormat}} zł</td>
            <td class="price">
              <div class="clear tooltipped" data-position="right" data-tooltip="Usuń z koszyka" @click="removeProduct(p.id) + productRemove(p.quantity)"><i class="material-icons">clear</i></div>
            </td>
          </tr>
          </tbody>

          <tfoot >
          <tr>
            <th>Totals</th>
            <td></td>
            <td></td>
            <td class="center">
             <div class="qty-minus total white-text">-</div>
             <div class="qty">{{totalQuantity}}</div>
             <div class="qty-plus total white-text">+</div>
              </td>
            <td class="price">{{totalSumm | priceFormat}} zł</td>
            <td></td>
          </tr>
          </tfoot>

        </table>

        <table class="mobile" v-if="($mq === 'tablet' || $mq === 'mobile') && productPosition.length">
          <tbody v-for="p in productPosition">
          <tr>
            <td><img :src="p.product.image" class="product-image"/></td>
            <td>
            <span>
              <div class="pName">{{p.name}}</div>
              <div class="quantity">Ilość:
                <span class="qty-minus" v-on:click="minusQty(p)">-</span>
                <span class="qty">{{p.quantity}}</span>
                <span class="qty-plus" v-on:click="plusQty(p)">+</span>
             </div>
              <div>Cena: {{computeSubTotal(p) | priceFormat}} zł</div>
              </span>
            </td>
            <td class="price" @click="totalQuantity">
              <a @click="totalQuantity"><i class="material-icons white teal-text" @click="totalQuantity">clear</i></a>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th>Totals</th>
            <td></td>
            <td class="price">{{totalSumm | priceFormat}} zł</td>
          </tr>
          </tfoot>
        </table>

      </div>
      <br><br>
      <div class="center">
        <a class="waves-effect btn-large grey white-text"><i class="material-icons right">navigate_next</i>Przejdź do platnosci</a>
      </div>
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
        this.productPosition.splice(index, 1)
      },
      plusQty: function(buy_data){
        buy_data.quantity=parseInt(buy_data.quantity) + parseInt(1);
      },
      minusQty: function(buy_data){
        buy_data.quantity = parseInt(buy_data.quantity) - parseInt(1);
        if (buy_data.quantity < 1){
          buy_data.quantity = 1;
        }
      },
      productAdd (n) {
        this.$emit('add', n)
      },
      productRemove (n) {
        this.$emit('remove', n)
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
  tfoot {
    border-top: 1px solid #d0d0d0;
  }
  .price{
    text-align: right;
    max-width: 10%;
  }

  .quantity{
    text-align: right;
  }

  #quantity-input{
    width: 3em;
    text-align: center;
  }
  .product-image{
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 399px) {
    th.mobile {
      display: block;
    }
    th.full{
      display:  none;
    }
  }
  @media screen and (min-width: 400px) {
    th.full {
      display: block;
    }
    th.mobile {
      display: none;
    }
  }

  .qty-minus {
    float: left;
    width: 20px;
    line-height: 100px;
    margin-left: 60px;
    text-align: center;
    cursor: pointer;
  }
  .qty {
    float: left;
    width: 20px;
    line-height: 100px;
    margin-left: 20px;
    text-align: center;
  }
  .qty-plus {
    float: left;
    width: 20px;
    line-height: 100px;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
  }

  .clear{
    cursor: pointer;
  }

  .total{
    cursor:default;
  }
</style>
