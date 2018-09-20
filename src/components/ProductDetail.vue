<template>
  <div class="container">
    <div class="grid second-nav">
      <div class="column-xs-12">
        <div>
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Household Plants</a></li>
            <li class="breadcrumb-item active">Bonsai</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="grid product">
      <div class="column-xs-12 column-md-7">
        <div class="product-gallery">
          <div class="product-image">
            <img class="active" :src=activeImage>
          </div>
          <ul class="image-list">
            <li class="image-item" @click="activeImage = image.image" v-for="image in images"><img :src=image.image></li>
          </ul>
        </div>
      </div>
      <div class="column-xs-12 column-md-5">
        <h1>Bonsai</h1>
        <h2>$19.99</h2>
        <div class="description">
          <p>The purposes of bonsai are primarily contemplation for the viewer, and the pleasant exercise of effort and ingenuity for the grower.</p>
          <p>By contrast with other plant cultivation practices, bonsai is not intended for production of food or for medicine. Instead, bonsai practice focuses on long-term cultivation and shaping of one or more small trees growing in a container.</p>
        </div>
        <!--<a class="waves-effect waves-light btn-large grey white-text"">Add To Cart</a>-->
        <button class="add-to-cart" @click="productAdd(1)">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProductDetail",
      data () {
        return {
          images:[{image:"https://source.unsplash.com/W1yjvf5idqA"},{image:"https://source.unsplash.com/VgbUxvW3gS4"},{image:"https://source.unsplash.com/5WbYFH0kf_8"}],
          activeImage:"https://source.unsplash.com/W1yjvf5idqA",
        }
      },
      methods:{
          changeImage(image){
            console.log("change image")
            console.log(image)
            console.log(image.image)
            this.activeImage=image.image;
          },
        productAdd (n) {
          this.$emit('add', n)
        },
        productRemove (n) {
          this.$emit('remove', n)
        },
        init(){
          console.log(this.$refs.materialboxed);
        }
      },
      created(){
        this.activeImage=this.images[0].image;
      },
      mounted(){
        this.init()
      }
    }

</script>

<style scoped>
  /* 12columns.css | Created by Katherine Kato | Released under the MIT license */
  @import url("https://fonts.googleapis.com/css?family=Pontano+Sans");
  .container {
    margin: auto;
    padding: 0 1rem;
    max-width: 71.25rem;
    width: 100%;
  }

  .grid {
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
  }
  .grid > [class*="column-"] {
    display: block;
  }

  .column-xs-12 {
    flex-basis: 100%;
    max-width: 100%;
  }

  @supports (display: grid) {
    .grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: auto;
    }
    .grid > [class*="column-"] {
      margin: 0;
      max-width: 100%;
    }

    .column-xs-12 {
      grid-column-start: span 12;
      grid-column-end: span 12;
    }

    @media (min-width: 62rem) {

      .column-md-5 {
        grid-column-start: span 5;
        grid-column-end: span 5;
      }

      .column-md-7 {
        grid-column-start: span 7;
        grid-column-end: span 7;
      }

    }
  }
  * {
    box-sizing: border-box;
  }
  *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pontano Sans', sans-serif;
    font-size: 1.125rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    color: #888;
    background: #fff;
    text-rendering: optimizeLegibility;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul li {
    margin: 0 1.75rem 0 0;
  }

  a {
    color: #888;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  a:hover {
    color: #333;
  }
  a.active {
    color: #333;
  }

  h1, h2, h3, h4 {
    color: #333;
    font-weight: normal;
    margin: 1.75rem 0 1rem 0;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2.125rem;
    margin: 0;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem 0;
  }

  section {
    display: block;
  }

  img {
    max-width: 100%;
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
  }

  nav {
    display: block;
  }
  nav li {
    font-size: 1.125rem;
    margin: 0;
  }

  .flex-nav ul {
    position: absolute;
    z-index: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    display: none;
    width: 100%;
    left: 0;
    padding: 1rem;
    background: #fff;
    text-align: center;
  }
  .flex-nav ul.active {
    display: flex;
  }
  .flex-nav ul li {
    margin: 0.5rem 0;
  }
  .toggle-nav i {
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 0 0 0 0.5rem;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 1rem 0 0 0;
    list-style: none;
  }
  .breadcrumb-list li {
    font-size: 0.85rem;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
  }

  .breadcrumb-item.active {
    color: #333;
  }
  .breadcrumb-item + .breadcrumb-item::before {
    content: '/';
    display: inline-block;
    padding: 0 0.5rem;
    color: #d5d5d5;
  }

  .description {
    border-top: 0.0625rem solid #e3dddd;
    margin: 2rem 0;
    padding: 1rem 0 0 0;
  }

  .add-to-cart {
    position: relative;
    display: inline-block;
    background: #3e3e3f;
    color: #fff;
    border: none;
    border-radius: 0;
    padding: 1.25rem 2.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    transition: color 0.3s ease;
    letter-spacing: 0.0625rem;
  }
  .add-to-cart:hover::before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  .add-to-cart::before {
    position: absolute;
    content: '';
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #565657;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  }

  .container {
    margin: auto;
    padding: 0 1rem;
    max-width: 75rem;
    width: 100%;
  }

  .grid > [class*="column-"] {
    padding: 1rem;
  }
  .grid.menu, .grid.product {
    border-bottom: 0.0625rem solid #e3dddd;
  }
  .grid.menu > [class*="column-"] {
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  .grid.product {
    padding: 0 0 1.5rem 0;
  }
  .grid.second-nav > [class*="column-"] {
    padding: 0.5rem 1rem;
  }

  footer {
    padding: 1rem 0;
    text-align: center;
  }

  .product-image {
    display: none;
  }

  .image-list li {
    margin: 0;
  }

  @media (min-width: 62rem) {
    .product-image img, .image-list img {
      width: 100%;
    }

    .product-image {
      display: block;
    }
    .product-image img {
      height: 52vh;
    }
    .product-image img.active {
      display: block;
      margin: 0 0 0.75rem 0;
    }

    .image-list {
      display: flex;
      overflow: hidden;
    }
    .image-list li {
      margin: 0 0.75rem 0 0;
      flex-basis: 100%;
    }
    .image-list li:nth-child(3) {
      margin: 0;
    }
    .image-list img {
      height: 10rem;
      width: 100%;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }
    .image-list img:hover {
      opacity: 0.7;
    }

    nav ul {
      justify-content: flex-end;
    }

    .flex-nav ul {
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: flex-end;
    }
    .flex-nav ul li {
      font-size: 1.125rem;
      margin: 0 1.5rem 0 0;
    }
    .flex-nav ul li:nth-child(4) {
      margin: 0;
    }
  }
  @-webkit-keyframes fadeImg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeImg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

</style>
