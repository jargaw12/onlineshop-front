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
  #catDiv {
    margin: 40px 6% 0 6%;
    text-align: center;
  }

  .cat {
    display: inline-block;
    width: 250px;
    height: 250px;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
  }

  .cat img {
    width: 100%;
    height: 100%;
  }

  .cat:hover img {
    position: static;
    width: 150%;
    height: 150%;
    align-self: center;
    margin: -25% 0 0 -25%;
    transition: width linear 0.5s, height linear 0.5s, margin linear 0.5s;
  }

  .catOverlay {
    position: relative;
  }

  .catOverlay:before{
    position: absolute;
    top: 0;
    left: 0;
    height: 10%;
    width: 10%;
    opacity: 0;
    content: "";
  }
  .catOverlay:hover:before{
    opacity: .6;
    background-color: #181818;
    height: 100%;
    width: 100%;
    transition: background-color linear 0.5s, height linear 0.5s, width linear 0.5s;
  }

  .catOverlay:after{
    position: absolute;
    bottom: 0;
    right: 0;
    height: 10%;
    width: 10%;
    opacity: 0;
    content: "";
  }
  .catOverlay:hover:after{
    opacity: .6;
    background-color: #181818;
    height: 100%;
    width: 100%;
    transition: background-color linear 0.5s, height linear 0.5s, width linear 0.5s;
  }

  .catTitle {
    position: absolute;
    display: block;
    color: #FFFFFF;
    text-shadow: 5px 5px 10px black;
    font-size: x-large;
    left: 50%;
    margin: -60% 0 0 -25%;
    width: 50%;
    height: auto;
    z-index: 2;
  }

</style>
