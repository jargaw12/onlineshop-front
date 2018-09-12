<template>

  <div id="app">
    <div id="scroll-animate-main">
      <div class="wrapper-parallax">
        <hea></hea>

        <div class="container">
          <router-view/>
        </div>

        <foo></foo>
      </div>
    </div>
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
