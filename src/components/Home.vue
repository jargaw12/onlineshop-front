<template>
  <div class="home">

    <div id="catDiv">
      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?laptops">
        <div class="catTitle">Laptops</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?tv">
        <div class="catTitle">Televisions</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?mercedes">
        <div class="catTitle">Cars</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?fashion">
        <div class="catTitle">Fashion</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?animal">
        <div class="catTitle">Animals</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?furniture">
        <div class="catTitle">Furniture</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?garden">
        <div class="catTitle">Gardens</div>
      </a>

      <a class="cat catOverlay" href="#">
        <img src="https://source.unsplash.com/500x500/?real-estate">
        <div class="catTitle">Houses</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Home'
      }
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

  .catHeading {
    text-align: center;
    font-weight: bolder;
    font-size: 3em;
  }

  .catSub {
    text-align: center;
    font-weight: bolder;
    font-size: 1.8em;
  }
</style>
