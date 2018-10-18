<template>

  <!--<div class="uk-card uk-card-default">-->
    <!--<div class="uk-card-media-top">-->
      <!--<router-link :to="{path: '/product/'+p_id }"><img :src="p_image" alt=""></router-link>-->
    <!--</div>-->
    <!--<div class="uk-card-body">-->
      <!--<div>-->
        <!--<h4 class="uk-text-truncate"><router-link :to="{path: '/product/'+p_id }">{{p_name}}</router-link></h4>-->
      <!--</div>-->
      <!--<div>-->
        <!--<p class=" uk-text-truncate">{{p_description}}</p>-->
      <!--</div>-->
      <!--<div>-->
        <!--{{p_price}} zł-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

  <vk-card type="blank">
    <div slot="media-top">
      <router-link :to="{path: '/product/'+p_id }"><img :src="p_image" alt=""></router-link>
    </div>
    <div>
      <vk-card-title class="uk-text-truncate uk-link-reset"><router-link :to="{path: '/product/'+p_id }">{{p_name}}</router-link></vk-card-title>
      <p class=" uk-text-truncate">{{p_description}}</p>
    </div>
        {{p_price}} zł
    <div ><vk-icon-button  href="#" icon="cart"></vk-icon-button></div>

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
      add(p){
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        api.post('/shoppingcart', p_id)
          .then(response => {
            this.$emit('add', 1);
            console.log("Dodano produkt: " + p_id)
          })
          .catch(e => {
            console.log('Nie można dodac produktu' +p_id + "o id: " + p_id);
            console.log("Error: " + e);
            console.log("Error: " + e.response);
            this.errors.push(e.response)
          })
      }
    }
  }
</script>

<style scoped>

</style>
