<template>
  <div id="app">
        <div>
          <!--<hea></hea>-->
          <router-view/>
        </div>
        <!--<foo></foo>-->
      </div>
</template>


<script>
  import Hea from './components/MyHeader.vue'

  export default {
    name: 'App',
    components: {
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
