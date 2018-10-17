<template>
  <div>
    <vk-offcanvas-content>
    <vk-navbar transparent>
      <vk-navbar-nav slot="left">
        <vk-navbar-toggle class="uk-hidden@m" @click="defaultNav = true"></vk-navbar-toggle>
        <vk-navbar-nav-dropdown class="uk-visible@m" title="Kategorie" navbar-aligned justified>
          <vk-navbar-nav-dropdown-nav>
            <vk-nav-item title="Active" active></vk-nav-item>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item-header title="Header"></vk-nav-item-header>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item-divider></vk-nav-item-divider>
            <vk-nav-item title="Item"></vk-nav-item>
          </vk-navbar-nav-dropdown-nav>
          <vk-navbar-nav-dropdown-nav>
            <vk-nav-item title="Active" active></vk-nav-item>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item-header title="Header"></vk-nav-item-header>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item title="Item"></vk-nav-item>
            <vk-nav-item-divider></vk-nav-item-divider>
            <vk-nav-item title="Item"></vk-nav-item>
          </vk-navbar-nav-dropdown-nav>
        </vk-navbar-nav-dropdown>
      </vk-navbar-nav>

      <vk-navbar-logo slot="center" class="uk-link-reset uk-active"><a href="/">Logo</a></vk-navbar-logo>

      <vk-navbar-nav slot="right">
        <vk-navbar-nav-item icon="search"></vk-navbar-nav-item>
        <vk-nav-item class="uk-visible@m" href="/login" title="Zaloguj"></vk-nav-item>
        <vk-navbar-nav-item class="uk-hidden@m" href="/login" icon="user"></vk-navbar-nav-item>
        <vk-nav-item class="uk-visible@m" title="Koszyk" href="/cart"></vk-nav-item>
        <vk-navbar-nav-item class="uk-hidden@m" icon="cart" href="/cart"></vk-navbar-nav-item>
      </vk-navbar-nav>
    </vk-navbar>

      <vk-offcanvas overlay :show.sync="defaultNav">
        <vk-nav class="uk-margin-auto-vertical">
          <h3>Logo</h3>
          <vk-nav-item title="Active" active></vk-nav-item>
          <vk-nav-item-parent title="Parent">
            <vk-nav-item title="Sub Item"></vk-nav-item>
            <vk-nav-item title="Sub Item"></vk-nav-item>
          </vk-nav-item-parent>
          <vk-nav-item-header title="Header"></vk-nav-item-header>
          <vk-nav-item title="Item" icon="table"></vk-nav-item>
          <vk-nav-item title="Item" icon="thumbnails"></vk-nav-item>
          <vk-nav-item-divider></vk-nav-item-divider>
          <vk-nav-item title="Item" icon="trash"></vk-nav-item>
        </vk-nav>
      </vk-offcanvas>
    </vk-offcanvas-content>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "MyHeader",
    data() {
      return {
        defaultNav: false,
        loggedIn:false,
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    },
    created() {
      const api = axios.create({
        baseURL: 'http://localhost:8080',
      });

      api.get('/shoppingcart/totalquantity')
        .then(response => {
          this.products = response.data;
          console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
        })
        .catch(e => {
          console.log("Error: " + e);
        })
    }
  }
</script>

<style scoped>
  vk-offcanvas>* {
    color: rgba(0, 0, 0, 0.5);
  }
  h6 {
    color: #000;
  }
</style>

