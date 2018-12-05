<template>
  <div class="uk-container">
    <h2>Zamówienie nr: {{order.id}}</h2>
    <hr>
    <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
      <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
        <dl class="uk-description-list">
          <dt>Numer zamówienia</dt>
          <dd>{{order.id}}</dd>
          <dt>Adres dostawy</dt>
          <dd>{{fullAdrress}}</dd>
          <dt>Data zamówienia</dt>
          <dd>{{order.createdtime}}</dd>
        </dl>
        <dl class="uk-description-list">
          <dt>Rodzaj dostawy</dt>
          <dd>{{order.deliveryByDeliveryid.deliverycompanydictionaryByDeliverycompany.name}}</dd>
          <dt>Koszt dostawy</dt>
          <dd>{{order.deliverycost}} zł</dd>
          <dt>Wartość zamówienia</dt>
          <dd>{{order.totalprice|priceFormat}} zł</dd>
        </dl>
      </div>
    </div>
    <hr>
    <h3>Produkty w zamówieniu</h3>
    <table class="uk-table uk-table-divider uk-text-left uk-margin-large-bottom">
      <thead>
      <tr>
        <th class="uk-table-shrink">Produkt</th>
        <th class="uk-table-expand"></th>
        <th class="uk-table-middle">Cena</th>
        <th class="uk-table-middle">Ilość</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product,index) in order.orderdetailsById">
        <td class="uk-table-shrink"><img :src="product.productByProductid.image"></td>
        <td class="uk-table-expand">{{product.productByProductid.name}}</td>
        <th class="uk-table-middle">{{product.productByProductid.price|priceFormat}} zł</th>
        <td class="uk-table-middle">{{product.quantity}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        order:{},
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$http.get('/orders/'+to.params.id)
          .then(response => {
            vm.order = response.data;
            console.log('orders');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
          });
      })
    },
    beforeRouteUpdate (to, from, next) {
      next(vm => {
        vm.$http.get('/orders/'+to.params.id)
          .then(response => {
            vm.order = response.data;
            console.log('orders');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
          });
      });
      next();
    },
    created() {
    },
    computed:{
      fullAdrress(){
        var adres=this.order.addressByAdresId.street+' ';
        if(this.order.addressByAdresId.flatnumber!=='')
          adres+=this.order.addressByAdresId.flatnumber+'/';
        adres+=this.order.addressByAdresId.flatnumber+', '+this.order.addressByAdresId.postcode+' '+this.order.addressByAdresId.city;
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

</style>
