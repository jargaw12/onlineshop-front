<template>
  <div>
    <div class="uk-container">
      <h1>Home</h1>
      <h3>Witaj + {{name}}</h3>
    </div>
    <div class="uk-position-relative uk-visible-toggle" uk-slideshow="animation: slide; ratio: 7:3">

      <ul class="uk-slideshow-items">
        <li>
          <img src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" uk-cover>
          <div class="uk-position-center uk-position-small uk-text-center uk-light">
            <h2 class="uk-margin-remove">Center</h2>
            <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </li>
        <li>
          <img src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" uk-cover>
          <div class="uk-position-center uk-position-small uk-text-center uk-light">
            <h3 class="uk-margin-remove">Center</h3>
            <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </li>
      </ul>

      <div class="uk-light">
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>

    </div>
    <br>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Home',
        name:"",
      }
    },
    mounted(){
        var isLoggedIn=false;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
