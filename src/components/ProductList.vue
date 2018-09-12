<template>
  <div class="productList">
    <div class="section">
      <div class="row">
        <div class="col s12 m6 l4" v-for="p in products">
          <div class="card">
            <div class="card-image">
              <img src="https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/m5g458pdbmvl0rubcsj0/meskie-buty-do-biegania-free-rn-2018-6Rd50P.jpg">
              <span class="card-title">{{p.name}}</span>
              <a class="btn-floating halfway-fab waves-effect waves-light">
                <i class="material-icons">add_shopping_cart</i>
              </a>
            </div>
            <div class="card-content">
              <p>{{p.description}}</p>
              <h6 class="price">
                {{p.price}} zł
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="pages">
      <div class="row">
        <div>
          <ul class="pagination">
            <li class="disabled">
              <a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
            <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'ProductList',
    data() {
      return {
        products: [],
        errors: []
      }
    },

    // Fetches posts when the component is created.
    created() {
      console.log('create');
      const api = axios.create({
        crossDomain : true,
        baseURL: `https://7f887a6b-a5cb-47cd-b34f-bf2f30ef8b46.mock.pstmn.io`,
        headers: {'x-api-key': '57c13c85d2f0409ca423e2f9772d8503',
          'Cache-Control': 'no-cache',
          'Postman-Token': 'f12715bc-c2b9-4a76-9aae-b19d0f281bb0'}});

      api
        .get(`/products2`, {
        })
        .then(response => {
          this.products = response.data;
          console.log('products');
        })
        .catch(e => {
          console.log('error');
          console.log("Error: " + e);
          this.errors.push(e.response)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price{
  text-align: right;
}
.card .card-image .card-title{
  color: teal;
}

</style>
