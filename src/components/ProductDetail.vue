<template>
  <div class="home">
    <nav>
      <div class="nav-wrapper">
        <div class="col s12">
          <a href="#!" class="breadcrumb">First</a>
          <a href="#!" class="breadcrumb">Second</a>
          <a href="#!" class="breadcrumb">Third</a>
        </div>
      </div>
    </nav>
    <h5>{{productName}}</h5>
    <img class="materialboxed" width="650" src="https://picsum.photos/200/300">
  </div>
</template>

<script>
    export default {
        name: "ProductDetail",
      data () {
        return {
          productName: 'Asus Vivobook S15'
        }
      },
      methods:{
        init(){
          console.log(this.$refs.materialboxed);
        }
      },
      mounted(){
        this.init()
      }
    }

</script>

<style scoped>
  .breadcrumb:before {
    color: rgb(161, 161, 161);
  }

  .breadcrumb:visited {
    color: teal;
  }

  nav {
    background: white;
  }
</style>
