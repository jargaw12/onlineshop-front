<template>
  <div>
    <h3 class="uk-text-center">Twoje konto</h3>
    <section>
      <h4>Zamówienia</h4>
      <table class="uk-table uk-table-divider">
        <thead class="uk-visible@s">
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
        <tbody v-for="o in orders" class="uk-visible@s">
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
        <tbody v-for="o in orders" class="uk-hidden@s">
        <tr>
          <th class="uk-width-medium">Nr zamówienia</th>
          <td class="uk-table-expand">{{o.orderID}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Data zamówienia</th>
          <td class="uk-table-expand">{{o.orderDate}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Data odbioru</th>
          <td class="uk-table-expand">{{o.deliveryDate}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Dostawa</th>
          <td class="uk-table-expand">{{o.deliveryForm}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Płatność</th>
          <td class="uk-table-expand">{{o.payment}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Status</th>
          <td class="uk-table-expand">{{o.status}}</td>
        </tr>
        <tr>
          <th class="uk-width-medium">Wartość</th>
          <td class="uk-table-expand">{{o.totalPrice}}</td>
        </tr>
        </tbody>
        <tfoot></tfoot>
      </table>

      <br>
    </section>
    <form class="uk-form-stacked">
      <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
        <fieldset class="uk-fieldset uk-first-column">
          <legend class="uk-h4">Dane kontaktowe</legend>
          <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
            <div class="uk-first-column"><label>
              <div class="uk-form-label">Imię</div>
              <input class="uk-input" type="text" value="Thomas"></label></div>
            <div><label>
              <div class="uk-form-label">Nazwisko</div>
              <input class="uk-input" type="text" value="Bruns"></label></div>
            <div class="uk-grid-margin uk-first-column"><label>
              <div class="uk-form-label">Telefon</div>
              <input class="uk-input" type="tel" value="8 (800) 555-35-35"></label></div>
            <div class="uk-grid-margin"><label>
              <div class="uk-form-label">Data urodzenia</div>
              <input class="uk-input" type="date" value="1990-01-01"></label></div>
          </div>
        </fieldset>
        <fieldset class="uk-fieldset uk-grid-margin uk-first-column">
          <legend class="uk-h4">Adres</legend>
          <div class="uk-grid-small uk-grid uk-grid-stack" uk-grid="">
            <div class="uk-width-1-1 uk-first-column"><label>
              <div class="uk-form-label">Państwo</div>
              <select class="uk-select">
                <option>Wybierz państwo</option>
                <option value="PL">Polska</option>
              </select></label></div>
          </div>
          <div class="uk-grid-small uk-grid" uk-grid="">
            <div class="uk-width-expand uk-first-column"><label>
              <div class="uk-form-label">Miasto</div>
              <input class="uk-input" type="text"></label></div>
            <div class="uk-width-1-3 uk-width-1-6@s"><label>
              <div class="uk-form-label">Kod pocztowy</div>
              <input class="uk-input" type="text"></label></div>
          </div>
          <div class="uk-grid-small uk-grid" uk-grid="">
            <div class="uk-width-expand uk-first-column"><label>
              <div class="uk-form-label">Ulica</div>
              <input class="uk-input" type="text"></label></div>
            <div class="uk-width-1-3 uk-width-1-6@s"><label>
              <div class="uk-form-label">Nr domu</div>
              <input class="uk-input" type="text"></label></div>
            <div class="uk-width-1-3 uk-width-1-6@s"><label>
              <div class="uk-form-label">Nr mieszkania</div>
              <input class="uk-input" type="text"></label></div>
          </div>
        </fieldset>
      </div>
    </form>
    <br>
  </div>
</template>

<script>
  // import axios from 'axios';

  export default {
    name: "UserAccount",
    data() {
      return {
        totalPages: 0,
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
      this.$http.get('/orders')
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
