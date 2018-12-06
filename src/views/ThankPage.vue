<template>
    <div class="uk-container uk-margin-large-bottom uk-text-center">
      <div class="uk-margin-large"></div>
      <h1>Dziękujemy</h1>
      <h3>Twoje zamówienie zostało przyjęte do realizacji</h3>
      <br>
      <div class="uk-child-width-1-2@m" uk-grid>
        <div>
          <span uk-icon="icon: mail; ratio: 6"></span>
        </div>
        <div class="uk-text-middle">
          <p class="uk-text-middle">Na twój adres e-mail wysłaliśmy szczegóły twojego zamówienia, oraz wskazówki dotyczące płatności</p>
        </div>
      </div>
      <hr>
      <p>Zapraszamy do dalszych zakupów</p>
      <button class="uk-button uk-button-default" type="button" @click="toHome">Strona główna</button>

    </div>
</template>

<script>
    export default {
        name: "ThankPage",
      data(){
          return{

          }
      },
      methods:{
        toHome(){
          this.$router.push({name:'home'})
        }
      }
    }
</script>

<style scoped>
  div{
    align-self: center
  }
</style>
