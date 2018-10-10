<template>

  <div id="app">
        <div class="uk-container">
          <hea></hea>

          <router-view @add="add" @remove="remove"/>
        </div>
        <!--<foo></foo>-->
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
    data() {
      return {
      }
    },
  }
</script>

<style>

</style>
