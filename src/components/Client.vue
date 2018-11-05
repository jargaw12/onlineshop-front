<template>
  <div class="uk-container">
    <hea></hea>
    <router-view></router-view>
  </div>
</template>

<script>
  import Hea from './MyHeader.vue'

  export default {
    name: "Client",
    components: {
      Hea,
    },
    beforeCreate(){
      this.$http.get('/menu/groups')
        .then(response => {
          // this.groups=response.data;
          console.log("Grupy 1/2 ");
          this.$store.commit('setCategories',response.data);
          console.log("Grupy 2/2 " + response.data);
        })
        .catch(e => {
          console.log("Error: " + e);
        });

      this.$http.get('/shoppingcart/totalquantity')
        .then(response => {
          this.$store.state.count=response.data;
          console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
  }
</script>

<style scoped>

</style>
