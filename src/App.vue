<template>
  <div id="app">
        <div class="uk-container">
          <hea></hea>
          <router-view/>
        </div>
        <!--<foo></foo>-->
      </div>
</template>


<script>
  import Foo from './components/MyFooter.vue'
  import Hea from './components/MyHeader.vue'
  import store from './store'

  export default {
    name: 'App',
    components: {
      Foo,
      Hea,
    },
    store,
    data() {
      return {
      }
    },
  }
</script>

<style>

</style>
