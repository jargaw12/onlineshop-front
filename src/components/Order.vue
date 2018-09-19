<template>
  <div>
  <section>
    <h5>Szczegóły zamówienia</h5>
    <table>
      <thead>
      <tr>
        <th>Nr zamówienia</th>
        <th>Data zamówienia</th>
        <th>Data odbioru</th>
        <th>Dostawa</th>
        <th>Płatność</th>
        <th>Status</th>
        <th>Wartość</th>
        <th>Faktura</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{order.orderID}}</td>
        <td>{{order.orderDate}}</td>
        <td>{{order.deliveryDate}}</td>
        <td>{{order.deliveryForm}}</td>
        <td>{{order.payment}}</td>
        <td>{{order.status}}</td>
        <td>{{order.totalPrice}}</td>
        <th></th>
      </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
    <br>
  </section>
    <section>
      <div>
        <h5>Produkty</h5>
        <table class="full" v-if="($mq === 'laptop' || $mq === 'desktop') && productPosition.length">
          <thead>
          <tr>
            <th>Produkt</th>
            <th></th>
            <th>Cena</th>
            <th>Ilosc</th>
            <th class="price">Razem</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="p in productPosition">
            <td><img :src="p.product.image" class="product-image"/></td>
            <td class="pName">{{p.product.name}}</td>
            <td>{{p.product.price | priceFormat}} zł</td>
            <td>{{p.quantity}}</td>
            <td class="price">{{computeSubTotal(p) | priceFormat}} zł</td>
          </tr>
          </tbody>

          <tfoot >
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th class="price">Koszt produktów</th>
            <td class="price">{{totalSumm | priceFormat}} zł</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th class="price">Koszt dostawy</th>
            <td class="price">{{totalSumm - order.totalPrice | priceFormat}} zł</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th class="price">Razem</th>
            <td class="price">{{deliveryPrice}} zł</td>
          </tr>
          </tfoot>

        </table>

      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Order",
    data() {
      return {
        total:0,
        productPosition: [],
        order:null,
        errors: []
      }
    },
    methods:{
      computeSubTotal: function(item) {
        return(parseFloat(item.product.price.toString().replace(",",".")) * parseFloat(item.quantity)).toFixed(2).replace(".",",");
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
      deliveryPrice: function(){
          return this.order.totalPrice;
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

      api.get('/order')
        .then(response => {
          this.productPosition = response.data;
          console.log('productPosition');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })

      axios.get('http://localhost:8080/order//$route.params.id')
        .then(response => {
          this.order = response.data;
          console.log('order');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })
    }
  }
</script>

<style scoped>
  tfoot {
    border-top: 1px solid #d0d0d0;
  }
  tfoot tr {
    border-top: none;
    border-bottom: none;

  }
  .price{
    text-align: right;
    max-width: 10%;
  }

  .quantity{
    text-align: right;
  }

  .product-image{
    width: 50px;
    height: 50px;
  }

  .qty {
    float: left;
    width: 20px;
    line-height: 100px;
    margin-left: 20px;
    text-align: center;
  }

  .total{
    cursor:default;
  }
</style>
