<template>
  <div class="uk-container">
  <br><br>
    <div class="uk-child-width-1-2@s uk-text-center" uk-grid>
      <div>
        <img :src=this.product.image>
      </div>

      <div class="uk-text-center">
        <br>
      <h3>{{this.product.name}}</h3>
        <h4>{{this.product.description}}</h4>
        <p>{{this.product.price|priceFormat}} zł</p>

        <br><br>
        <div>
          <button  class="uk-button uk-button-secondary uk-width-1-2 uk-text-center" @click="add()">Dodaj do koszyka <span class="uk-margin-small-right" uk-icon="chevron-right"></span></button>
        </div>
      </div>

    </div>

    <ul uk-tab>
      <li><a>Opis produktu</a></li>
      <li><a>Przesyłka</a></li>
      <li><a>Opinie</a></li>
    </ul>

    <ul class="uk-switcher uk-margin">
      <li id="opis">
        <span><span class="uk-text-bold">Wskazówki pielęgnacyjne:</span> Pranie w pralce w 40°C, pranie delikatne</span>
      </li>
      <li id="przesyłka">
        <ul class="uk-list">
          <li><span uk-icon="icon: check"></span> Bezpłatna przesyłka i zwrot</li>
          <li><span uk-icon="icon: check"></span> 30-dniowe prawo zwrotu</li>
          <li><span uk-icon="icon: check"></span> Przesyłka realizowana w ciągu 2-5 dni roboczych</li>
        </ul>
        <br>
      </li>
      <li id="opinie">
        <div  v-for="i in 3">
          <article class="uk-comment">
            <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
              <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset">Autor {{i}}</a></h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                  <li><a>0{{i}}.0{{i}}.2018</a></li>
                  <!--<li><a href="#">Reply</a></li>-->
                </ul>
                <span class="uk-margin-small-right" uk-icon="star"  v-for="k in i"></span>
              </div>
            </header>
            <div class="uk-comment-body">
              <p>{{comments[i-1].text}}</p>
            </div>
          </article>
          <hr>
          <br>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
  // import axios from 'axios';
  export default {
      data () {
        return {
          product:null,
          images:[{image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg"},
            {image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-add-1-large.jpg"},
            {image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-add-2-large.jpg"}],
          activeImage:"images/products/1/1-large.jpg",
          comments:[{text:"Słaby materiał"},{text:"Szybka dostawa, dobry produkt"},{text:"Porządny produkt wart swojej ceny"}]
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
        add() {
          var userProduct = {
            id: this.product.id,
            quantity: 0
          };
          if (localStorage.getItem('user-token') !== '') {
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
                console.log('Nie można dodac produktu');
                console.log("Error: " + e.response);
              });
          }
        }
      },
      created(){
        this.$http.get('products/product/'+this.$route.params.id)
          .then(response => {
            this.product = response.data;
            console.log('product');
          })
          .catch(e => {
            if (e.response.status===404){
              this.$router.push({name: 'PageNotFound'})
            }
          })
      },
    filters: {
      priceFormat: function (value) {
        if (!value) return '';
        // value = value.toString();
        return value.toFixed(2).replace(".",",");
      }
    },
    }

</script>

<style scoped>
  img{
    max-height: 600px;
  }
</style>
