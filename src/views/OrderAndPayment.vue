<template>
  <div class="uk-container">
    <ul id="payment-switcher" uk-tab uk-switcher="animation: uk-animation-fade" class=" uk-child-width-expand">
      <li><a>Rodzaj płatności</a></li>
      <li><a>Adres</a></li>
      <li><a>Podsumowanie</a></li>
    </ul>

    <ul class="uk-switcher uk-margin">
      <li>
        <h4>Rodzaj płatności</h4>
        <br>
        <form>
          <fieldset class="uk-fieldset">
            <ul class="uk-list uk-list-divider">
              <li>
                <input type="radio" class="uk-radio" id="przy_odbiorze" value=3 v-model="platnosc">
                <label for="przy_odbiorze"> Płatność przy odbiorze</label>
              </li>
              <li>
                <input type="radio" class="uk-radio" id="payu" value=1 v-model="platnosc">
                <label for="payu"> Przelew bankowy</label>
              </li>
            </ul>
          </fieldset>
        </form>
        <br>
        <h4>Rodzaj dostawy</h4>
        <br>
        <form>
          <fieldset class="uk-fieldset">
            <ul class="uk-list uk-list-divider">
              <li>
                <input type="radio" class="uk-radio" id="kurier" value=2 v-model="dostawa">
                <label for="kurier"> Dostawa kurierska (20zł)</label>
              </li>
              <li>
                <input type="radio" class="uk-radio" id="paczkomat" value=3 v-model="dostawa">
                <label for="paczkomat"> Odbiór własnu (0zł)</label>
              </li>
            </ul>
          </fieldset>
        </form>
        <button class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" uk-switcher-item="next">Dalej <span
          class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
      </li>

      <li>
        <div>
          <div class="uk-text-left">
            <dl class="uk-description-list">
              <dt>Miasto</dt>
              <dd>{{this.address.city}}</dd>
              <dt>Kod pocztowy</dt>
              <dd>{{this.address.postcode}}</dd>
              <dt>Ulica</dt>
              <dd>{{this.address.street}}</dd>
              <dt>Nr domu</dt>
              <dd>{{this.address.flatnumber +"/"+this.address.streetnumber}}</dd>
            </dl>
          </div>
          <a class="uk-icon-link uk-margin-small-right" uk-icon="info" uk-tooltip="title: Aby zmienic adres dostawy przejdź do ustawień konta;pos: right; delay: 200"></a>
          <button class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" uk-switcher-item="next">Dalej <span
          class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
        </div>
      </li>

      <li>
        <vk-table responsive :data="this.productPosition" rowKey="id">
          <vk-table-column title="Produkt" cell="item.image">
            <img class="" slot-scope="{cell}" :src="cell" width="100" alt=""/>
          </vk-table-column>
          <vk-table-column class="uk-visible@m" title="" cell="item.name"></vk-table-column>
          <vk-table-column title="Cena" cell="item.price">
            <div slot-scope="{cell}">{{cell|priceFormat}} zł</div>
          </vk-table-column>
          <vk-table-column title="Ilość" cell="quantity">
          </vk-table-column>
          <vk-table-column title="Razem">
            <div slot-scope="{ row }">{{computeSubTotal(row)}} zł</div>
          </vk-table-column>
        </vk-table>
        <hr>
        <h4>Razem: {{totalSumm|priceFormat}} zł </h4>
        <h4>Koszt dostawy: {{kosztDostawy|priceFormat}}zł </h4>
        <h4>Do zapłaty: {{totalWithDelivery|priceFormat}} zł </h4>
        <button class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="sendOrder">Zamów
          <span v-if="!logging" class="uk-margin-small-right" uk-icon="chevron-right"></span>
          <span v-else class="uk-margin-small-right" uk-spinner="ratio: 0.6"></span>
        </button>
      </li>
    </ul>
    <br>
  </div>
</template>

<script>
  import Home from "./Home";

  export default {
    name: "OrderAndPayment",
    components: {Home},
    data() {
      return {
        productPosition: [],
        platnosc: "3",
        dostawa: "2",
        address: {
          street: null,
          streetnumber: null,
          flatnumber: null,
          postcode: null,
          city: null,
          country: null
        },
        orders:{
          totalprice:null,
          deliverycost:null,
          adres_id:null,
          deliveryByDeliveryid:{
            id:null
          },
          paymentByPaymentid:{
            id:null,
          }
        },
        logging:false,
      }
    },
    methods: {
      computeSubTotal: function (item) {
        return (parseFloat(item.item.price.toString().replace(",", ".")) * parseFloat(item.quantity)).toFixed(2).replace(".", ",");
      },
      sendOrder() {
        this.logging=true;
        this.orders.deliveryByDeliveryid.id=this.dostawa;
            this.orders.deliverycost=this.kosztDostawy;
            this.orders.totalprice=this.totalWithDelivery;
            this.orders.paymentByPaymentid.id=this.platnosc;
            this.$http.post("/orders/add",this.orders)
              .then((data)=>{
                console.log("order ok")
                this.logging=false;
                this.$router.replace({name:'thank'})
              })
              .catch((e)=>{
                console.log("order error:"+e.data);
                this.logging=false;
              })
      }
    },
    filters: {
      priceFormat: function (value) {
        if (!value) return '';
        // value = value.toString();
        return value.toFixed(2).replace(".", ",");
      }
    },
    computed: {
      totalSumm: function () {
        return parseFloat(this.productPosition.reduce(function (total, item) {

          return total + (parseFloat(item.quantity) * parseFloat(item.item.price));
        }, 0));
      },
      totalWithDelivery: function () {
        return parseFloat((parseFloat(this.totalSumm) + parseFloat(this.kosztDostawy)));
      },
      kosztDostawy: function () {
        if (this.dostawa === "2")
          return Number(20.00);
        else
          return Number(0.00001);
      },
    },
    created() {
      this.$http.get('/shoppingcart')
        .then(response => {
          this.productPosition = response.data;
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })

      this.$http.get('/account/address')
        .then(response => {
          this.address = response.data;
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
  .fill {
    border-color: #1e87f0;
  }

</style>
