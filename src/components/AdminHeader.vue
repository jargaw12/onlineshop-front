<template>
  <div >
    <div class="uk-offcanvas-content top">
      <nav class="uk-navbar-container uk-margin uk-navbar-transparent uk-container" uk-navbar>
        <div class="uk-navbar-left uk-visible@m">
            <ul class="uk-navbar-nav">
              <router-link class="uk-navbar-item uk-logo" :to="{name:'adminHome'}">Logo</router-link>
              <li><router-link :to="{name:'addProduct'}">Produkty</router-link></li>
              <!--<li><a>Klienci</a></li>-->
            </ul>
        </div>
        <div class="uk-navbar-right"><div>
          <ul class="uk-navbar-nav">
            <li v-if="!authenticated"><router-link :to="{name:'adminSignIn'}">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
              <span class="uk-visible@m">Zaloguj</span></router-link></li>
            <li v-if="authenticated">
              <a @click="logout">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: sign-out"></span>
              </a>
            </li>
          </ul>
        </div></div>
        <div class="uk-navbar-left uk-hidden@m">
          <ul class="uk-navbar-nav">
            <li class="uk-hidden@m">
              <a class="uk-navbar-toggle uk-hidden@m" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
            </li>
            <li class="uk-hidden@m"><router-link class="uk-navbar-item uk-logo" :to="{name:'home'}">Logo</router-link></li>
          </ul>
        </div>
        <!-- Mobile menu -->
      </nav>
    </div>
    <nav id="offcanvas-nav" uk-offcanvas="overlay: false">
      <div class="uk-offcanvas-bar uk-flex uk-flex-column">

        <a class="uk-align-left uk-logo">Logo</a>
        <!-- B - nav -->
        <ul class="uk-nav uk-nav-parent-icon" uk-nav>
          <li><a>Produkty</a></li>
          <li><a>Klienci</a></li>
          <li class="uk-nav-divider"></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "MyHeader",
    data() {
      return {
        defaultNav: false,
      }
    },
    computed: {
      authenticated() {
        return this.$store.getters.adminIsLoggedIn;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('adminLogout');
        this.$router.push({name:'adminHome'})
      },
    }
  }
</script>

<style scoped>
  .uk-offcanvas-bar .uk-logo{
    color: #666;
  }

  .uk-offcanvas-bar a{
    color: #666;
  }

  .top{
    /*background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);*/
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);

  }

</style>
