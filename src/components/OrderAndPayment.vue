<template>
    <div>
      <div class="uk-margin-medium-top">
        <vk-tabs align="justify">
          <vk-tabs-item title="Adres">
            <fieldset class="uk-fieldset uk-grid-margin uk-first-column">
              <legend class="uk-h4">Adres dostawy</legend>
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
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="toPayment">Dalej <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>

          <vk-tabs-item title="Rodzaj płatności">
            <h4>Rodzaj dostawy</h4>
            <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
              <div><vk-card><vk-card-title>Dostawa kurierska</vk-card-title><p>Dostawa kurierska</p></vk-card></div>
              <div><vk-card><vk-card-title>Odbiór osobisty</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
              <div><vk-card><vk-card-title>Paczkomaty</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
            </vk-grid>
            <h4>Rodzaj płatności</h4>
            <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
              <div><vk-card><vk-card-title>Przelew bankowy</vk-card-title><p>Dostawa kurierska</p></vk-card></div>
              <div><vk-card><vk-card-title>Płatność przy odbiorze</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
              <div><vk-card><vk-card-title>PayU</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
            </vk-grid>
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="toTotal">Dalej <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>

          <vk-tabs-item title="Item">
            <vk-table  responsive :data="this.productPosition" rowKey="id">
              <vk-table-column title="Produkt" cell="product.image">
                <img class="" slot-scope="{cell}" :src="cell" width="100" alt="" />
              </vk-table-column>
              <vk-table-column class="uk-visible@m" title="" cell="product.name"></vk-table-column>
              <vk-table-column title="Cena" cell="product.price">
                <div slot-scope="{cell}">{{cell|priceFormat}} zł</div>
              </vk-table-column>
              <vk-table-column title="Ilość" cell="quantity">
              </vk-table-column>
              <vk-table-column title="Razem">
                <div slot-scope="{ row }">{{computeSubTotal(row)}} zł</div>
              </vk-table-column>
            </vk-table>
            <hr>
            <h4>Razem: {{totalSumm}} zł </h4>
            <h4>Koszt dostawy: 20 zł </h4>
            <h4>Do zapłaty: {{totalWithDelivery}} zł </h4>
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="pay">Płatność <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>


        </vk-tabs>
      </div>
      <br>
      <div class="uk-margin-medium-top">
        <vk-tabs align="justify" :activeTab="activeTab">
          <vk-tabs-item :active="addres.active" :class="addressClass" id="adres" title="Adres" :icon="addres.icon" :disabled="addres.disabled">
            <fieldset class="uk-fieldset uk-grid-margin uk-first-column">
              <legend class="uk-h4">Adres dostawy</legend>
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
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="toPayment">Dalej <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>

          <vk-tabs-item id="platnosc" title="Rodzaj płatności" :icon="payment.icon" :disabled="payment.disabled">
            <h4>Rodzaj dostawy</h4>
            <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
              <div><vk-card><vk-card-title>Dostawa kurierska</vk-card-title><p>Dostawa kurierska</p></vk-card></div>
              <div><vk-card><vk-card-title>Odbiór osobisty</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
              <div><vk-card><vk-card-title>Paczkomaty</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
            </vk-grid>
            <h4>Rodzaj płatności</h4>
            <vk-grid gutter="small" matched class="uk-child-width-1-3@m">
              <div><vk-card><vk-card-title>Przelew bankowy</vk-card-title><p>Dostawa kurierska</p></vk-card></div>
              <div><vk-card><vk-card-title>Płatność przy odbiorze</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
              <div><vk-card><vk-card-title>PayU</vk-card-title><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></vk-card></div>
            </vk-grid>
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="toTotal">Dalej <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>

          <vk-tabs-item id="podsumowanie" title="Podsumowanie" :icon="total.icon" :disabled="total.disabled">
            <vk-table  responsive :data="this.productPosition" rowKey="id">
              <vk-table-column title="Produkt" cell="product.image">
                <img class="" slot-scope="{cell}" :src="cell" width="100" alt="" />
              </vk-table-column>
              <vk-table-column class="uk-visible@m" title="" cell="product.name"></vk-table-column>
              <vk-table-column title="Cena" cell="product.price">
                <div slot-scope="{cell}">{{cell|priceFormat}} zł</div>
              </vk-table-column>
              <vk-table-column title="Ilość" cell="quantity">
              </vk-table-column>
              <vk-table-column title="Razem">
                <div slot-scope="{ row }">{{computeSubTotal(row)}} zł</div>
              </vk-table-column>
            </vk-table>
            <hr>
            <h4>Razem: {{totalSumm}} zł </h4>
            <h4>Koszt dostawy: 20 zł </h4>
            <h4>Do zapłaty: {{totalWithDelivery}} zł </h4>
            <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center" @click="pay">Płatność <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
          </vk-tabs-item>
        </vk-tabs>
      </div>
    </div>
</template>

<script>
    import Stepper from "./Stepper";
    import Home from "./Home";
    import axios from 'axios'
    export default {
      name: "OrderAndPayment",
      components: {Home, Stepper},
      data(){
        return{
          productPosition:[],
          addressClass:'',
          paymentClass:'',
          totalClass:'',
          activeTab:0,
          addres:{
            active:true,
            icon:'',
            disabled:false
          },
          payment:{
            active:false,
            icon:'',
            disabled:true
          },
          total:{
            active:false,
            icon:'',
            disabled:true
          }
        }
      },
      methods:{
        toPayment(){
          this.activeTab=1;
          this.addressClass='fill';
          this.addres.icon='check';
          this.addres.active=true;
          this.payment.disabled=false;
        },
        toTotal(){
          this.activeTab=2;
          this.paymentClass='fill';
          this.payment.icon='check';
          this.total.active=true;
          this.total.disabled=false;
        },
        computeSubTotal: function(item) {
          return(parseFloat(item.product.price.toString().replace(",",".")) * parseFloat(item.quantity)).toFixed(2).replace(".",",");
        },
        pay(){
          console.log("pay");
          axios({
            method: 'POST',
            url: 'https://secure.payu.com/api/v2_1/orders/',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd'
            },
            body: "{  \"notifyUrl\": \"https://your.eshop.com/notify\",  \"customerIp\": \"127.0.0.1\",  \"merchantPosId\": \"145227\",  \"description\": \"RTV market\",  \"currencyCode\": \"PLN\",  \"totalAmount\": \"21000\",  \"products\": [    {      \"name\": \"Wireless mouse\",      \"unitPrice\": \"15000\",      \"quantity\": \"1\"    },    {      \"name\": \"HDMI cable\",      \"unitPrice\": \"6000\",      \"quantity\": \"1\"    }  ]}"
          }).then(function (response) {
            console.log("odpowiedz: "+response.data)
            // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
          });
        },
      },
      filters: {
        priceFormat: function (value) {
          if (!value) return '';
          // value = value.toString();
          return value.toFixed(2).replace(".",",");
        }
      },
      computed: {
        totalSumm: function(){
          return parseFloat(this.productPosition.reduce(function(total, item){

            return total + (parseFloat(item.quantity) * parseFloat(item.product.price));
          },0)).toFixed(2).replace(".",",");
        },
        totalWithDelivery: function(item) {
          return((parseFloat(this.totalSumm.toString().replace(",",".")) + 20).toFixed(2).replace(".",","));
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
      }
    }
</script>

<style scoped>
  .fill{
    border-color:#1e87f0;
  }

</style>
