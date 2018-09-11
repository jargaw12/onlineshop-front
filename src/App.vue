<template>

  <div id="app">
    <div id="scroll-animate-main">
      <div class="wrapper-parallax">
        <hea></hea>

        <section class="content">
          <router-view/>
        </section>

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
  @import "../static/css/materialize.css";
  @import "../static/css/style.css";
  @import url('https://fonts.googleapis.com/css?family=Material+Icons');
</style>
