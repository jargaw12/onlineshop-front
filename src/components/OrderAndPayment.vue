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
          var api=axios.create({
            // url: '/proba/pl/standard/user/oauth/authorize',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic QVNKdHQzZE5LLTlPakxLSE9pRVhmWEtWM053SXlNaW5NeW15LW1zazlSSWphSllsMnBCQ214WEMzYjRsMDU4VEdnUDRTN1ZIZVlKdFpDR3g6RUJMUjI1T2FmajB1RUtHRFVKVU1VTmdZelY4WHNuRll5d1ZUcXNYRXNKUmd6bkhlMTBuUmpuRjMyTnR2M0YxZmctOV82aGxfYnZ1SWFPeWY',
            },
            // data: {
            //   grant_type: 'client_credentials'
            // }
            auth:{
              client_id:'ASJtt3dNK-9OjLKHOiEXfXKV3NwIyMinMymy-msk9RIjaJYl2pBCmxXC3b4l058TGgP4S7VHeYJtZCGx',
              secret:'EBLR25Oafj0uEKGDUJUMUNgYzV8XsnFYywVTqsXEsJRgznHe10nRjnF32Ntv3F1fg-9_6hl_bvuIaOyf',
              },
            form: { grant_type: 'client_credentials' }
            });

          api.post('https://api.sandbox.paypal.com/v1/oauth2/token',
            // headers:
            //   {
            //     'Authorization': 'Basic MTQ1MjI3OjEyZjA3MTE3NGNiN2ViNzlkNGFhYzViYzJmMDc1NjNm',
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //   },
            // data: {
            //       'grant_type': 'client_credentials'
            //     }
            // auth:{
            //   client_id:'300746',
            //   client_secret:'2ee86a66e5d97e3fadc400c9f19b065d',
            // },
            // {
            //   params:{
            //     grant_type:'client_credentials',
            // }}
          ).then((response) =>{
            console.log("odpowiedz: "+response.data)
          }).catch(e=>{
              console.log("pay-error");
              console.log(e);
            });


          // var data = {
          //   "grant_type": "client_credentials",
          //   "client_id": '145227',
          //   "client_secret": '12f071174cb7eb79d4aac5bc2f07563f'
          // };
          // axios.post('https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
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
