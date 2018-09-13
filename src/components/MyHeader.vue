<template>
  <nav class="white" role="navigation">
    <div class="nav-wrapper container">
      <ul class="left hide-on-med-and-down">
        <li><a href="#">Kategorie</a></li>
      </ul>
      <a id="logo-container" href="/" class="brand-logo center">Logo</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="/cart"><i class="material-icons left">shopping_cart</i>Koszyk<span class="badge">(4)</span></a></li>
        <li><a href="#">Zaloguj/Zarejestruj</a></li>
      </ul>
      <!--   Navbar mobile version   -->
      <ul id="nav-mobile" class="sidenav">
        <li><a href="#">Zaloguj/Zarejestruj</a></li>
        <li><a href="/cart"><i class="material-icons left">shopping_cart</i>Koszyk<span class="badge">(4)</span></a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "MyHeader"
  }
</script>

