<template>
  <div>
    <h3>Twoje konto</h3>
    <section>
      <h5>Dane</h5>
      <p>Avatar: </p>
      <p>Imię: </p>
      <p>Nazwisko: </p>
      <p>Adres: </p>
      <p>Telefon: </p>
    </section>
    <section>
      <h5>Zamówienia</h5>
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
        </tr>
        </thead>
        <tbody v-for="o in orders">
        <tr>
          <td><router-link :to="{path: '/order/'+o.orderID }">{{o.orderID}}</router-link></td>
          <td>{{o.orderDate}}</td>
          <td>{{o.deliveryDate}}</td>
          <td>{{o.deliveryForm}}</td>
          <td>{{o.payment}}</td>
          <td>{{o.status}}</td>
          <td>{{o.totalPrice}}</td>
        </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <br>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "UserAccount",
    data() {
      return {
        total: 0,
        url:1111111,
        orders: [],
        errors: []
      }
    },
    methods:{
      setorder: function(item) {
        this.url="/order/"+item.orderID;
      }
      },
    created() {
      console.log('create');
      const api = axios.create({
        crossDomain : true,
        baseURL: 'https://7f887a6b-a5cb-47cd-b34f-bf2f30ef8b46.mock.pstmn.io',
        headers: {'x-api-key': '57c13c85d2f0409ca423e2f9772d8503',
          'Cache-Control': 'no-cache',
          'Postman-Token': 'f12715bc-c2b9-4a76-9aae-b19d0f281bb0'}});
      api.get('/orders')
        .then(response => {
          this.orders = response.data;
          console.log('orders');
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
</style>
