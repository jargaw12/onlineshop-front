<template>
    <div v-if="order">
      <!--<div class="uk-modal-header">-->
        <!--<h2 class="uk-modal-title">New Modal Zamówienie nr: {{order.id}}</h2>-->
      <!--</div>-->
      <!--<div class="uk-modal-body">-->
      <h2>Zamówienie nr: {{order2.id}}</h2>
      <hr>
        <div class="uk-grid-medium uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid="">
          <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-grid" uk-grid="">
            <label>
              <div class="uk-form-label uk-text-left">Adres e-mail</div>
              jarrcioo@gmail.com
            </label>
            <label>
              <div class="uk-form-label uk-text-left">Numer komórkowy</div>
              512599776
            </label>
            <label>
              <div class="uk-form-label uk-text-left">Imię i nazwisko</div>
              Jarosław Gawryś
            </label>
            <label>
              <div class="uk-form-label uk-text-left">Adres</div>
              Osiedlowa 1, 05-340 Rudzienko
            </label>
          </div>
        </div>
      </div>
    <!--</div>-->
</template>

<script>
  export default {
        name: "ModalWindow",
        props:['order'],
        data(){
          return{
            order2:null,
          }
        },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$http.get('/orders/'+this.order.id)
          .then(response => {
            vm.order2 = response.data;
            console.log('orders');
          })
          .catch(e => {
            console.log('error');
            console.log("Error: " + e);
          });
      })
    },
    }
</script>

<style scoped>

</style>
