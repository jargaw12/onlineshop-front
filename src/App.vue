<template>

  <div id="app">
        <hea></hea>
        <div class="container">
          <router-view/>
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
    }
  }

</script>

<style>

</style>
