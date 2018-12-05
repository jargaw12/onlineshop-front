<template>
  <div>
    <vk-card type="blank">
      <div slot="media-top">
        <router-link :to="{path: '/product/'+p_id }"><img :src="p_image" alt=""></router-link>
      </div>
      <div>
        <h4 class="uk-text-truncate uk-link-reset"><router-link :to="{path: '/product/'+p_id }">{{p_name}}</router-link></h4>
        <p class=" uk-text-truncate">{{p_description}}</p>
      </div>
      {{p_price}} zł
      <div ><vk-icon-button icon="cart" @click="add(p_id)"></vk-icon-button></div>
    </vk-card>
    <div id="modal-close-default" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title uk-text-center">Zaloguj się</h2>
        <p class="uk-text-center">Aby dodać do koszyka musisz być zalogowany</p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ProductCard",
    props: ['p_id', 'p_name', 'p_description', 'p_price', 'p_image'],
    methods:{
      add(id){
        var userProduct={
          id:id,
          quantity:0
        };
        if(localStorage.getItem('user-token')!=='') {
          this.$http.post('/shoppingcart/add', userProduct)
            .then(response => {
              this.$store.commit('plus', 1);
              console.log("Dodano nowy produkt nr: " + id)
              UIkit.notification({
                message: '<span uk-icon=\'icon: check\'></span>Dodano do koszyka',
                timeout: 1000,
                pos: 'top-right'
              })
            })
            .catch(e => {
              UIkit.modal('#modal-close-default').show();
              // console.log('Nie można dodac produktu');
              // console.log("Error: " + e);
              // console.log("Error: " + e.response);
              // this.errors.push(e.response)
            });
        }
        else {
          UIkit.modal('#modal-close-default').show();
        }
      }
    }
  }
</script>

<style scoped>
  h4{
    font-size: 1.0rem;
  }

</style>
