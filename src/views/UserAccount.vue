<template>
  <div class="uk-container">
    <h3 class="uk-text-center">Twoje konto</h3>
    <!--<div id="viewActiveOrder" uk-modal>-->
    <!--<div class="uk-modal-dialog">-->
    <!--<button class="uk-modal-close-default" type="button" uk-close></button>-->
    <!--<div class="uk-modal-body">-->
    <!--<order :order="activeOrder"></order>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <h4>Konto</h4>
    <hr>
    <div>
      <div id="editData" uk-modal>
        <div class="uk-modal-dialog">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-modal-header">
            <h2 class="uk-modal-title">Edytuj dane</h2>
          </div>
          <div class="uk-modal-body">
            <form class="uk-form-stacked">
              <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
                <fieldset class="uk-fieldset uk-first-column">
                  <legend class="uk-h4">Dane osobowe</legend>
                  <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
                    <div class="uk-first-column">
                      <label>
                        <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('email') }">Adres
                          e-mail
                        </div>
                        <input disabled class="uk-input" :class="{ 'uk-form-danger': errors.has('email') }" type="text"
                               v-model="user.username" v-validate="'required|email'" name="email">
                      </label>
                    </div>
                    <div>
                      <label>
                        <div class="uk-form-label uk-text-left"
                             :class="{ 'uk-text-danger': errors.has('numer komórkowy') }">Numer komórkowy
                        </div>
                        <input class="uk-input" :class="{ 'uk-form-danger': errors.has('numer komórkowy') }" type="text"
                               v-model="user.phonenumber" v-validate="'required|digits:9'"
                               name="numer komórkowy"></label>
                      <p class="error-message">{{ errors.first('numer komórkowy') }}</p>
                    </div>
                    <div class="uk-width-1-1 uk-width-1-2@s">
                      <label>
                        <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('imie') }">Imię</div>
                        <input class="uk-input" :class="{ 'uk-form-danger': errors.has('numer komórkowy') }" type="text"
                               v-model="user.firstname" v-validate="'required|alpha'" name="imie">
                      </label>
                      <p class="error-message">{{ errors.first('imie') }}</p>
                    </div>
                    <div class="uk-width-1-1 uk-width-1-2@s">
                      <label>
                        <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('nazwisko') }">Nazwisko</div>
                        <input class="uk-input" :class="{ 'uk-form-danger': errors.has('nazwisko') }" type="text" v-model="user.lastname" v-validate="'required|alpha'" name="nazwisko">
                      </label>
                      <p class="error-message">{{ errors.first('nazwisko') }}</p>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="uk-fieldset uk-grid-margin uk-first-column">
                  <legend class="uk-h4">Dane adresowe</legend>
                  <div class="uk-grid-small uk-grid" uk-grid="">
                    <div class="uk-width-expand uk-first-column"><label>
                      <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('miasto') }">Miasto</div>
                      <input class="uk-input" :class="{ 'uk-form-danger': errors.has('miasto') }" type="text" v-model="user.address.city" v-validate="'required|alpha_dash'" name="miasto"></label>
                      <p class="error-message">{{ errors.first('miasto') }}</p>
                    </div>
                    <div class="uk-width-1-3 uk-width-1-4@s">
                      <label>
                        <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('kod pocztowy') }">Kod pocztowy</div>
                        <input class="uk-input" :class="{ 'uk-form-danger': errors.has('kod pocztowy') }" type="text" v-model="user.address.postcode" v-validate="{ required: true, regex:/^([0-9]{2}-[0-9]{3})$/}" name="kod pocztowy">
                      </label>
                      <p class="error-message">{{ errors.first('kod pocztowy') }}</p>
                    </div>
                  </div>
                  <div class="uk-grid-small uk-grid" uk-grid="">
                    <div class="uk-width-expand uk-first-column"><label>
                      <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('ulica') }">Ulica</div>
                      <input class="uk-input" :class="{ 'uk-form-danger': errors.has('ulica') }" type="text" v-model="user.address.street" v-validate="'required'" name="ulica"></label></div>
                    <div class="uk-width-1-3 uk-width-1-4@s"><label>
                      <p class="error-message">{{ errors.first('ulica') }}</p>
                      <div class="uk-form-label uk-text-left" :class="{ 'uk-text-danger': errors.has('nr domu') }">Nr domu</div>
                      <input class="uk-input" :class="{ 'uk-form-danger': errors.has('nr domu') }" type="text" v-model="user.address.streetnumber" v-validate="'required|devimal'" name="nr domu"></label></div>
                    <div class="uk-width-1-3 uk-width-1-4@s"><label>
                      <p class="error-message">{{ errors.first('nr domu') }}</p>
                      <div class="uk-form-label uk-text-left">Nr mieszkania</div>
                      <input class="uk-input" type="text" v-model="user.address.flatnumber"></label></div>
                  </div>
                </fieldset>
              </div>
            </form>
          </div>
          <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Anuluj</button>
            <button class="uk-button uk-button-secondary" @click="savePersonData" type="button">Zapisz</button>
          </div>
        </div>
      </div>

      <div>
        <div class="uk-text-left">
          <dl class="uk-description-list">
            <dt>Imię i nazwisko</dt>
            <dd>{{user.firstname}} {{user.lastname}}</dd>
            <dt>Adres e-mail</dt>
            <dd>{{user.username}}</dd>
            <dt>Numer telefonu</dt>
            <dd>{{user.phonenumber}}</dd>
            <dt>Adres</dt>
            <dd>{{this.fullAdrress}}</dd>
          </dl>
        </div>
        <br>
        <div class="uk-text-center@m">
          <button class="uk-button uk-button-secondary uk-margin-large-bottom" href="#editData" uk-toggle>Edyduj <span
            uk-icon="icon: pencil"></span></button>
        </div>
      </div>
    </div>
    <section>
      <h4>Zamówienia</h4>
      <hr>
      <table class="uk-table uk-table-divider uk-text-left">
        <thead>
        <tr>
          <th class="uk-table-shrink">Lp</th>
          <th>Numer zamówienia</th>
          <th>Data zamówienia</th>
          <th>Dostawa</th>
          <th>Wartość zamówienia</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order,index) in orrders">
          <td class="uk-table-shrink">{{index}}</td>
          <td><a class="uk-link-reset" @click="toOrder(order.id)">{{order.id}}</a></td>
          <td>{{order.createdtime}}</td>
          <th>{{order.deliveryByDeliveryid.deliverydictionaryByDeliverytype.name}}</th>
          <td>{{order.totalprice|priceFormat}} zł</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <br>
    </section>
  </div>
</template>

<script>
  // import axios from 'axios';
  import Order from "../components/OrderDataModal"

  export default {
    name: "UserAccount",
    components: {
      Order,
    },
    data() {
      return {
        totalPages: 0,
        url: 1111111,
        orders: [],
        orrders: [],
        user: null,
        activeOrder: null,
      }
    },
    methods: {
      setorder: function (item) {
        this.url = "/order/" + item.orderID;
      },
      savePersonData() {
        this.$http.post("/account/change", this.user)
          .then((data) => {
            console.log("change data ok")
            this.user = data;
            UIkit.modal('#editData').hide();
          })
          .catch((e) => {
            console.log("change data error: " + e.data())
          })
      },
      setOrderToActive(order) {
        this.activeOrder = order;
      },
      toOrder(id) {
        this.$router.push({name: 'Order', params: {id: id}});
      }
    },
    created() {
      this.$http.get('/orders/all')
        .then(response => {
          this.orrders = response.data;
          this.activeOrder = response.data[0];
          console.log('orders');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
        });
      this.$http.get('/account')
        .then(response => {
          this.user = response.data;
          console.log('orders');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
        });
    },
    computed: {
      fullAdrress() {
        var adres = this.user.address.street + ' ';
        if (this.user.address.flatnumber !== '')
          adres += this.user.address.flatnumber + '/';
        adres += this.user.address.streetnumber + ', ' + this.user.address.postcode + ' ' + this.user.address.city;
        return adres;
      }
    },
    filters: {
      priceFormat: function (value) {
        if (!value) return '';
        // value = value.toString();
        return value.toFixed(2).replace(".", ",");
      }
    },
  }
</script>

<style scoped>
  .mybtn {
    text-align: center;
  }

  .error-message {
    margin-top: 0px;
    color: #f0506e;
  }

  tfoot {
    border-top: 1px solid #d0d0d0;
  }
</style>
