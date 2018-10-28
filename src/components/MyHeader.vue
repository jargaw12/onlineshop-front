<template>
  <div>
    <vk-offcanvas-content>
      <vk-navbar transparent>
        <vk-navbar-nav slot="left">
          <vk-navbar-toggle class="uk-hidden@m" @click="defaultNav = true"></vk-navbar-toggle>
          <vk-navbar-nav-dropdown class="uk-visible@m" title="Kategorie" navbar-aligned justified>
            <vk-navbar-nav-dropdown-nav>
              <vk-nav-item-header title="Kobiety"></vk-nav-item-header>
              <vk-nav-item title="Odzież" active></vk-nav-item>
              <vk-nav-item title="Sukienki"></vk-nav-item>
              <vk-nav-item title="Swetry i bluzy"></vk-nav-item>
              <vk-nav-item title="Spodnie"></vk-nav-item>
              <vk-nav-item title="Spódnice"></vk-nav-item>
              <vk-nav-item-divider></vk-nav-item-divider>
              <vk-nav-item title="Obuwie" active></vk-nav-item>
              <vk-nav-item title="Trampki" ></vk-nav-item>
              <vk-nav-item title="Półbuty"></vk-nav-item>
              <vk-nav-item title="Botki"></vk-nav-item>
              <vk-nav-item title="Szpilki"></vk-nav-item>
              <vk-nav-item title="Baleriny"></vk-nav-item>
              <vk-nav-item title="Akcesoria" active></vk-nav-item>
            </vk-navbar-nav-dropdown-nav>
            <vk-navbar-nav-dropdown-nav>
              <vk-nav-item-header title="Mężczyźni"></vk-nav-item-header>
              <vk-nav-item title="Odzież" active @click="toList"></vk-nav-item>
              <vk-nav-item title="Koszulki"></vk-nav-item>
              <vk-nav-item title="Koszule"></vk-nav-item>
              <vk-nav-item title="Bluzy i swetry"></vk-nav-item>
              <vk-nav-item title="Spodnie"></vk-nav-item>
              <vk-nav-item-divider></vk-nav-item-divider>
              <vk-nav-item title="Obuwie" active></vk-nav-item>
              <vk-nav-item title="Trampki"></vk-nav-item>
              <vk-nav-item title="Półbuty"></vk-nav-item>
              <vk-nav-item title="Biznesowe"></vk-nav-item>
              <vk-nav-item title="Akcesoria" active></vk-nav-item>
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
        </vk-navbar-nav>

        <vk-navbar-logo slot="center" class="uk-link-reset uk-active"><a href="/">Logo</a></vk-navbar-logo>

        <vk-navbar-nav slot="right">
          <!--<vk-navbar-nav-item icon="search"></vk-navbar-nav-item>-->
          <vk-nav-item v-if="!authenticated" class="uk-visible@m" href="/login" title="Zaloguj"></vk-nav-item>
          <vk-nav-item v-if="authenticated" class="uk-visible@m" href="/account" title="Konto"></vk-nav-item>
          <vk-navbar-nav-item class="uk-hidden@m" href="/login" icon="user" title=""></vk-navbar-nav-item>
          <vk-nav-item class="uk-visible@m" :title="'Koszyk ('+count+')'" href="/cart"></vk-nav-item>
          <vk-navbar-nav-item class="uk-hidden@m" icon="cart" href="/cart" :title="'('+count+')'"></vk-navbar-nav-item>
          <vk-nav-item class="uk-visible@m" v-if="authenticated" icon="sign-out" @click="logout" title=""></vk-nav-item>
        </vk-navbar-nav>
      </vk-navbar>

      <vk-offcanvas overlay :show.sync="defaultNav">
        <vk-nav class="uk-margin-auto-vertical">
          <h3>Logo</h3>
          <vk-nav-item-parent title="Kobiety">
            <vk-nav-item-parent title="Odzież" @click="toList">
              <vk-nav-item title="Sukienki"></vk-nav-item>
              <vk-nav-item title="Swetry i bluzy"></vk-nav-item>
              <vk-nav-item title="Spodnie"></vk-nav-item>
              <vk-nav-item title="Spódnice"></vk-nav-item>
            </vk-nav-item-parent>
            <vk-nav-item-parent title="Obuwie" >
              <vk-nav-item title="Trampki" ></vk-nav-item>
              <vk-nav-item title="Półbuty"></vk-nav-item>
              <vk-nav-item title="Botki"></vk-nav-item>
              <vk-nav-item title="Szpilki"></vk-nav-item>
              <vk-nav-item title="Baleriny"></vk-nav-item>
            </vk-nav-item-parent>
            <vk-nav-item title="Akcesoria"></vk-nav-item>
          </vk-nav-item-parent>
          <vk-nav-item-parent title="Mężczyźni">
            <vk-nav-item-parent title="Odzież" @click="toList">
              <vk-nav-item title="Koszulki"></vk-nav-item>
              <vk-nav-item title="Koszule"></vk-nav-item>
              <vk-nav-item title="Bluzy i swetry"></vk-nav-item>
              <vk-nav-item title="Spodnie"></vk-nav-item>
            </vk-nav-item-parent>
            <vk-nav-item-parent title="Obuwie" >
              <vk-nav-item title="Trampki"></vk-nav-item>
              <vk-nav-item title="Półbuty"></vk-nav-item>
              <vk-nav-item title="Biznesowe"></vk-nav-item>
              <vk-nav-item title="Akcesoria" active></vk-nav-item>
            </vk-nav-item-parent>
            <vk-nav-item title="Akcesoria"></vk-nav-item>
          </vk-nav-item-parent>
          <vk-nav-item-header v-if="authenticated" title="Konto"></vk-nav-item-header>
          <vk-nav-item v-if="authenticated" title="Konto" icon="user"></vk-nav-item>
          <vk-nav-item v-if="authenticated" :title="'Koszyk ('+count+')'" icon="cart"></vk-nav-item>
          <vk-nav-item v-if="authenticated" title="Zamówienia" icon="credit-card"></vk-nav-item>
          <vk-nav-item-divider></vk-nav-item-divider>
          <vk-nav-item v-if="authenticated" title="Wyloguj" icon="sign-out" @click="logout"></vk-nav-item>
        </vk-nav>
      </vk-offcanvas>
    </vk-offcanvas-content>
    <!--<vk-notification messages="Dodano do koszyka" timeout="1000">-->
      <!--<div slot-scope="{ message }">-->
        <!--<vk-icon icon="cart"></vk-icon> {{ message }}-->
      <!--</div>-->
    <!--</vk-notification>-->
  </div>
</template>

<script>
  // import router from '../router'
  // import axios from 'axios';
  import VkNavItemParent from "vuikit/src/library/nav/components/nav--item-parent";
  import VkNavItem from "vuikit/src/library/nav/components/nav--item";
  export default {
    name: "MyHeader",
    components: {VkNavItem, VkNavItemParent},
    data() {
      return {
        defaultNav: false,
        loggedIn:false,
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      },
      authenticated() {
        return this.$store.getters.isLoggedIn;
      }
    },
    created() {
      this.$http.get('/shoppingcart/totalquantity')
        .then(response => {
          this.products = response.data;
          console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
        })
        .catch(e => {
          console.log("Error: " + e);
        })
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        // localStorage.removeItem('user-token');
        // delete axios.defaults.headers.common["Authorization"];
        // this.$store.commit('setAuth',false);
      },
      toList(){
        this.$router.push({path: 'list', query: { page: 1, size:3 }});
      }
    }
  }
</script>

<style scoped>
  .uk-offcanvas-bar h3{
    color: #666;
  }

  .uk-offcanvas-bar p{
    color: #666;
  }

  .uk-offcanvas-bar .uk-nav-default .uk-nav-header{
    color: #666;
  }

  .uk-offcanvas-bar .uk-nav-default>li>a{
    color: #666;
  }

  .uk-offcanvas-bar .uk-nav-default .uk-nav-sub a{
    color: #666;
  }
</style>
