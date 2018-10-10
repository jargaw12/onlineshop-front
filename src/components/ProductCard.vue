<template>

  <div class="uk-card uk-card-default">
    <div class="uk-card-media-top">
      <router-link :to="{path: '/product/'+p.id }"><img :src="p_image" alt=""></router-link>
    </div>
    <div class="uk-card-body">
      <div>
        <h4 class="uk-text-truncate"><router-link :to="{path: '/product/'+p.id }">{{p_name}}</router-link></h4>
      </div>
      <div>
        <p class=" uk-text-truncate">{{p_description}}</p>
      </div>
      <div>
        {{p_price}} zł
      </div>
    </div>
  </div>

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
        api.post('/shoppingcart', p.id)
          .then(response => {
            this.$emit('add', 1);
            console.log("Dodano produkt: " + p.name)
          })
          .catch(e => {
            console.log('Nie można dodac produktu' +p.name + "o id: " + p.id);
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
