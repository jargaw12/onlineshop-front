<template>
  <div class="section">
    <div class="row">

      <div>
        <h3 class="center grey-text darken-4">Twój koszyk</h3>
      </div>
      <br><br>

      <div>
        <table class="full">
          <thead>
          <tr>
            <th></th>
            <th>Produkt</th>
            <th class="price">Cena</th>
            <th class="quantity">Ilosc</th>
            <th class="price">Razem</th>
            <th class="price"></th>
          </tr>
          </thead>

          <tbody v-for="p in products">
          <tr>
            <td><img :src="p.image" class="product-image"/></td>
            <td class="pName">{{p.name}}</td>
            <td class="price">{{p.price | priceFormat}} zł</td>
           <td>
             <div class="qty-minus" v-on:click="minusQty(buy_data)">-</div>
             <div class="qty">{{p.quantity}}</div>
             <div class="qty-plus" v-on:click="plusQty(buy_data)">+</div>
           </td>
            <td class="price">{{computeSubTotal(p) | priceFormat}} zł</td>
            <td class="price">
              <div class="clear" @:click="removeProduct"><i class="material-icons">clear</i></div>
            </td>
          </tr>
          </tbody>

          <tfoot >
          <tr>
            <th>Totals</th>
            <td></td>
            <td></td>
            <td class="quantity">{{totalQuantity}}</td>
            <td class="price">{{totalSumm | priceFormat}} zł</td>
            <td></td>
          </tr>
          </tfoot>

        </table>

        <table class="mobile">
          <tbody v-for="p in products">
          <tr>
            <td><img :src="p.image" class="product-image"/></td>
            <td>
            <span>
              <div class="pName">{{p.name}}</div>
              <div class="quantity">
                <div class="qty-minus" v-on:click="minusQty(buy_data)">-</div>
             <div class="qty">{{p.quantity}}</div>
             <div class="qty-plus" v-on:click="plusQty(buy_data)">+</div>
          </div>
              <div>{{computeSubTotal(p) | priceFormat}} zł</div>
              </span>
            </td>
            <td class="price">
              <a @click="totalQuantity"><i class="material-icons white teal-text">clear</i></a>
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
        products: [],
        errors: []
      }
    },
    methods:{
      computeSubTotal: function(item) {
        return(parseFloat(item.price.replace(",",".")) * parseFloat(item.quantity.replace(",","."))).toFixed(2).replace(".",",");
      },
      totalSumm: function(){
        var sum = 0;
        this.products.forEach(function(buyitem){
          sum += parseInt(computeSubTotal(buyitem));
        });
        return sum;
      },
      totalQuantity: function(){
        var sum = 0;
        this.products.forEach(function(buyitem){
          sum += parseInt(buyitem.quantity);
        });
        return sum;
      },
      plusQty: function(buy_data){
        buy_data.quantity += 1;
        // buy_data.total = buy_data.qty*buy_data.price;
      },
      minusQty: function(buy_data){
        buy_data.qty -= 1;
        if (buy_data.qty < 0){
          buy_data.qty = 0;
        }
        // buy_data.total = buy_data.qty*buy_data.price;
      }
    },
    filters: {
      priceFormat: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      }
    },
    computed: {
      // totalQuantity: function(){
      //   console.log(this.products);
      //   return this.products.reduce(function(total, item){
      //
      //     return total + parseFloat(item.quantity);
      //   },0);
      // },
      // totalSumm: function(){
      //   return parseFloat(this.products.reduce(function(total, item){
      //
      //     return total + (parseFloat(item.quantity) * parseFloat(item.price));
      //   },0)).toFixed(2).replace(".",",");
      // },
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
    this.products = response.data;
    console.log('products');
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
</style>
