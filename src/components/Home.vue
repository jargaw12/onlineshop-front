<template>
  <div class="home">
    <h1>Home</h1>
    <h3>Witaj + {{name}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Home',
        name:"",
      }
    },
    mounted(){
        var isLoggedIn=false;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
