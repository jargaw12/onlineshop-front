<template>
    <div>
        <div id="nav">
          <hea :menuData="categories"></hea>
        </div>
        <router-view />
    </div>
</template>

<script>
  import Hea from '../components/MyHeader.vue'
  export default {
        name: "Client",
    components: {
      Hea,
    },
    data(){
      return{
        categories:[]
      }
    },
    beforeCreate(){
      // this.$http.get('/menu/groups')
      //   .then(response => {
      //     // this.groups=response.data;
      //     console.log("Grupy 1/2 ");
      //     this.$store.commit('setCategories',response.data);
      //     this.categories=response.data;
      //     console.log("Grupy 2/2 " + response.data);
      //   })
      //   .catch(e => {
      //     console.log("Error: " + e);
      //   });

      if(localStorage.getItem('user-token')!=='') {
        this.$http.get('/shoppingcart/totalquantity')
          .then(response => {
            this.$store.state.count = response.data;
            console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
          })
          .catch(e => {
            console.log("Ilosc w koszyku error: " + e);
          });
      }
      else {
        //TODO get from local storage
      }
    }
    }
</script>

<style scoped>


</style>
