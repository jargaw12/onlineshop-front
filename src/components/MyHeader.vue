<template>
  <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
    <!--<div class="uk-navbar-center">-->

      <div class="uk-navbar-left"><div>
        <ul class="uk-navbar-nav">
          <li>
            <a href="#">Kategorie</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li class="uk-active"><a href="#">Active</a></li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div></div>
    <div class="uk-navbar-center">
      <a class="uk-navbar-item uk-logo" href="#">Logo</a>
    </div>
      <div class="uk-navbar-right"><div>
        <ul class="uk-navbar-nav">
          <li><a href="#">Zaloguj</a></li>
          <li><a href="/cart">Koszyk ({{products}})</a></li>
        </ul>
      </div></div>

    <!--</div>-->
  </nav>
</template>

<script>
  export default {
    name: "MyHeader",
    props:['products'],
    data() {
      return {
        loggedIn:false,
      }
    }
  }
</script>

