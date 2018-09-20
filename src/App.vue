<template>

  <div id="app">
        <hea :products="products"></hea>
        <div class="container">
          <router-view @add="add" @remove="remove"/>
        </div>
        <foo></foo>
      </div>
</template>


<script>
  import Foo from './components/MyFooter.vue'
  import Hea from './components/MyHeader.vue'

  export default {
    name: 'App',
      components: {
        Foo,
        Hea,
    },
    data(){
      return{
        products:0
      }
    },
    methods:{
      add(n){
        this.products=this.products+n;
      },
      remove(n){
        this.products=this.products-n;
      }
    }
  }

</script>

<style>

</style>
