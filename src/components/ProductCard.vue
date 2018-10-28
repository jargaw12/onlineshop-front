<template>
  <vk-card type="blank">
    <div slot="media-top">
      <router-link :to="{path: '/product/'+p_id }"><img :src="p_image" alt=""></router-link>
    </div>
    <div>
      <vk-card-title class="uk-text-truncate uk-link-reset"><router-link :to="{path: '/product/'+p_id }">{{p_name}}</router-link></vk-card-title>
      <p class=" uk-text-truncate">{{p_description}}</p>
    </div>
        {{p_price}} zł
    <div ><vk-icon-button  href="#" icon="cart" @click="add(p_id)"></vk-icon-button></div>

    <!--<span><vk-icon-button href="#" icon="cart"></vk-icon-button>-->
      <!--{{p_price}} zł-->
    <!--</span>-->
  </vk-card>

</template>

<script>
  export default {
    name: "ProductCard",
    props: ['p_id', 'p_name', 'p_description', 'p_price', 'p_image'],
    methods:{
      add(id){

        this.$http.post('/shoppingcart/',id)
          .then(response => {
            this.$store.commit('plus', 1);
            console.log("Dodano nowy produkt nr: " +  id)
          })
          .catch(e => {
            console.log('Nie można dodac produktu');
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            // this.errors.push(e.response)
          });
      }
    }
  }
</script>

<style scoped>

</style>
