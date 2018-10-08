<template>
  <div>
    <div>

      <div>
        <h3 class="uk-text-center">Twój koszyk</h3>
      </div>
      <br><br>
      <h6 class="center" v-if="!this.productPosition.length">Brak produktów w koszyku</h6>

      <div>

        <table v-if="this.productPosition.length" class="uk-table uk-table-responsive uk-table-divider">
          <thead>
          <tr>
            <!--<th></th>-->
            <th>Produkt</th>
            <!--<th>Cena</th>-->
            <!--<th class="uk-text-left">Ilosc</th>-->
            <!--<th>Razem</th>-->
            <th>
              <div>
                <div class="uk-grid-small uk-child-width-expand uk-grid" uk-grid="">
                  <div class="uk-first-column">Cena</div>
                  <div class="tm-quantity-column">Ilość</div>
                  <div>Razem</div>
                  <div class="uk-width-auto">
                    <div style="width: 20px;"></div>
                  </div>
                </div>
              </div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in productPosition">
            <td  class="uk-text-middle">
              <div></div><img  :src="item.product.image" class="product-image"/> <span>{{item.product.name}}</span></td>
            <!--<td class="uk-text-middle">{{item.product.name}}</td>-->
            <td class="uk-text-middle">
              <div class="">
                <div class="uk-grid-small uk-child-width-1-1 uk-child-width-expand@s uk-text-center uk-grid" uk-grid="">
                  <div class="uk-visible@m">
                    <div>{{item.product.price | priceFormat}} zł</div>
                  </div>
                  <div>
                    <a class="qty-minus" uk-icon="minus" v-on:click="minusQty(item, index)" ratio="0.5"></a>
                    <div class="qty">{{item.quantity}}</div>
                    <a class="qty-plus" uk-icon="plus" v-on:click="plusQty(item, index)" ratio="0.5"></a>
                  </div>
                  <div>
                    <div>{{computeSubTotal(item) | priceFormat}} zł</div>
                  </div>
                  <div><a uk-icon="close" @click="productRemove(item, index)"></a></div>
                </div>
              </div>
            </td>
            <!--<td class="uk-text-middle">{{item.product.price | priceFormat}} zł</td>-->
            <!--<td class="uk-text-middle">-->
              <!--<a class="qty-minus" uk-icon="minus" v-on:click="minusQty(item, index)" ratio="0.5"></a>-->
              <!--<div class="qty">{{item.quantity}}</div>-->
              <!--<a class="qty-plus" uk-icon="plus" v-on:click="plusQty(item, index)" ratio="0.5"></a>-->
            <!--</td>-->
            <!--<td class="uk-text-middle">{{computeSubTotal(item) | priceFormat}} zł</td>-->
            <!--<td class="uk-text-middle">-->
              <!--<a uk-icon="close" @click="productRemove(item, index)"></a>-->
            <!--</td>-->
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th class="uk-text-middle">
              Podsumowanie
              <span class="uk-hidden@m uk-align-right">{{totalSumm | priceFormat}}</span>
            </th>

            <td class="uk-align-right uk-text-middle">
              <div>
                {{totalSumm | priceFormat}} zł
              </div>
            </td>
          </tr>
          </tfoot>
        </table>

      </div>
      <br><br>
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
      <button  class="uk-button uk-button-secondary uk-width-1-2 uk-align-center">Płatność <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
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
      productRemove (p, productId) {
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        });
        api.delete('/shoppingcart/'+ p.product.id)
          .then(response => {
            this.$emit('remove', p.quantity);
            this.productPosition.splice(productId, p.quantity);
            console.log("Usunieto produkt nr: " + p.product.id)
          })
          .catch(e => {
            console.log('Nie można usunąć produktu z listy');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      },
      plusQty: function(buy_data,productId){

        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        });
        api.patch('/shoppingcart/'+ buy_data.product.id, 1)
          .then(response => {
            buy_data.quantity=parseInt(buy_data.quantity) + parseInt(1);
            this.$emit('add', 1);
            console.log("Zwiększono produkt nr: " +  buy_data.id)
          })
          .catch(e => {
            console.log('Nie można powiększyć produktu');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })

      },
      minusQty: function(buy_data,productId){
        buy_data.quantity = parseInt(buy_data.quantity) - parseInt(1);
        this.$emit('remove', 1)
        if (buy_data.quantity < 1){
          buy_data.quantity = 1;
        }
        else {
          const api = axios.create({
            baseURL: 'http://localhost:8080',
            headers:{
              'Access-Control-Allow-Origin': 'http://localhost:8080',
            }
          });
          api.patch('/shoppingcart/'+ buy_data.product.id, -1)
            .then(response => {
              this.$emit('remove', 1);
              console.log("Zmniejszono produkt nr: " + buy_data.product.id)
            })
            .catch(e => {
              console.log('Nie można zmniejszyc produktu');
              console.log("Error: " + e);
              console.log("Error: " + e.response);
              this.errors.push(e.response)
            })
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
      const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers:{
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        }
      });

      api
        .get('/shoppingcart')
  .then(response => {
    this.productPosition = response.data;
    console.log("Dodano liste produktów o długości: " + this.productPosition.length)
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
