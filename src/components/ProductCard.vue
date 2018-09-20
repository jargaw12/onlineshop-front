<template>
  <div class="card">
    <div class="card-image">
      <img :src="p_image">
      <span class="card-title"><a href="/detail">{{p_name}}</a></span>
      <a class="btn-floating halfway-fab buy grey" onclick="M.toast({html: 'Dodano produkt do koszyka'})">
        <i class="material-icons">add_shopping_cart</i>
      </a>
    </div>
    <div class="card-content">
      <p>{{p_description}}</p>
      <h6 class="price">
        {{p_price}} zł
      </h6>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ProductCard",
    props: ['p_name', 'p_description', 'p_price', 'p_image']
  }
</script>

<style scoped>
  .price {
    text-align: right;
  }

  .card .card-image .card-title {
    color: dimgrey;
  }

  .card-content {
    height: 140px; /* Your height here */
    overflow: hidden;
  }


</style>
