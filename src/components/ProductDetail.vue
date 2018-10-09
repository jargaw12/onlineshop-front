<template xmlns:color="http://www.w3.org/1999/xhtml">
  <div>

    <div class="uk-child-width-1-2 uk-text-center" uk-grid>
      <div>
      <div class="uk-position-relative" uk-slideshow="animation: fade">
        <ul class="uk-slideshow-items">
          <li><img :src=images[0].image alt="" uk-cover></li>
          <li><img :src=images[1].image alt="" uk-cover></li>
          <li><img :src=images[2].image alt="" uk-cover></li>
        </ul>
      </div>

      <div class="uk-align-center">
          <ul class="uk-thumbnav">
            <li uk-slideshow-item="0"><a href="#" @click="UIkit.slideshow('.uk-position-relative').show(0);"><img :src=images[0].image width="100" alt=""></a></li>
            <li uk-slideshow-item="1"><a href="#"><img :src=images[1].image width="100" alt=""></a></li>
            <li uk-slideshow-item="2"><a href="#"><img :src=images[2].image width="100" alt=""></a></li>
          </ul>
        </div>
      </div>

      <div>2 kolumna</div>

    </div>

    <ul uk-tab>
      <li><a href="#">Opis</a></li>
      <li><a href="#">Specyfikacja</a></li>
      <li><a href="#">Opinie</a></li>
    </ul>

    <ul class="uk-switcher uk-margin">
      <li id="opis">
        <div>
          <article class="uk-article">
            <div class="uk-article-body">
              <h2>Touch Bar</h2>
              <p>Vivamus ornare tortor elit, sed rutrum felis iaculis in. Nunc ut molestie neque. Aenean vitae elementum arcu, at rutrum ligula. Pellentesque fringilla dictum viverra. Vestibulum eu ipsum nec risus pharetra iaculis. Donec quis nulla orci. Suspendisse eget dictum augue, et lobortis justo. Suspendisse velit dui, sollicitudin quis velit nec, tincidunt consequat arcu.</p>
              <h2>Retina Display</h2>
              <p>Pellentesque dictum imperdiet rutrum. Vestibulum egestas quam eget maximus rutrum. Etiam blandit a dolor laoreet vulputate. Nulla ullamcorper ipsum et libero finibus, vitae vestibulum odio feugiat.</p>
              <figure class="uk-text-center"><img src="https://chekromul.github.io/uikit-ecommerce-template/images/articles/macbook-promo-4.jpg" alt="MacBook Pro"></figure>
            </div>
          </article>
        </div>
      </li>
      <li id="specyfikacja">
        <h3>Ogólna</h3>
        <table class="uk-table uk-table-divider uk-table-justify uk-table-responsive">
          <tbody>
          <tr>
            <th class="uk-width-medium">Panel Type</th>
            <td class="uk-table-expand">IPS</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Size</th>
            <td class="uk-table-expand">15.4"</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Aspect Ratio</th>
            <td class="uk-table-expand">16:10</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Native Resolution</th>
            <td class="uk-table-expand">2880×1800</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Touchscreen</th>
            <td class="uk-table-expand">—</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Finish</th>
            <td class="uk-table-expand">Glossy</td>
          </tr>
          <tr>
            <th class="uk-width-medium">Brightness</th>
            <td class="uk-table-expand">500&nbsp;cd/m<sup>2</sup></td>
          </tr>
          </tbody>
        </table>
      </li>
      <li id="opinie">
        <div  v-for="i in 3">
          <article class="uk-comment">
            <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
              <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset">Author</a></h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                  <li><a>09.10.2018</a></li>
                  <!--<li><a href="#">Reply</a></li>-->
                </ul>
                <span class="uk-margin-small-right" uk-icon="star"  v-for="k in i"></span>
              </div>
            </header>
            <div class="uk-comment-body">
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
    export default {
        name: "ProductDetail",
      data () {
        return {
          images:[{image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-large.jpg"},
            {image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-add-1-large.jpg"},
            {image:"https://chekromul.github.io/uikit-ecommerce-template/images/products/1/1-add-2-large.jpg"}],

          activeImage:"images/products/1/1-large.jpg",
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

</style>
