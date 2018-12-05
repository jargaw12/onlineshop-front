<template>
    <div class="uk-container uk-margin-large-bottom uk-margin-large-top uk-text-center">
      <h2>Dziękujemy za złożenie zamówienia</h2>
      <p>Sprawdź swoją pocztę e-mail, aby pobrać dokument pro forma oraz uzyskać informacje na temat płatności </p>
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

</style>
