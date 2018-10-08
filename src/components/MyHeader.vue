<template>
  <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
    <!--<div class="uk-navbar-center">-->

      <div class="uk-navbar-left"><div>
        <ul class="uk-navbar-nav">
          <li class="uk-visible@m">
            <a href="#">Kategorie</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li class="uk-active"><a href="#">Active</a></li>
                <li><a href="#">Item</a></li>
                <li><a href="#">Item</a></li>
              </ul>
            </div>
          </li>

          <li class="uk-hidden@m">
            <a class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
            <div id="offcanvas-nav" uk-offcanvas="overlay: true">
              <div class="uk-offcanvas-bar">

                <ul class="uk-nav uk-nav-default">
                  <li class="uk-active"><a href="#">Active</a></li>
                  <li class="uk-parent">
                    <a href="#">Parent</a>
                    <ul class="uk-nav-sub">
                      <li><a href="#">Sub item</a></li>
                      <li><a href="#">Sub item</a></li>
                    </ul>
                  </li>
                  <li class="uk-nav-header">Header</li>
                  <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: table"></span> Item</a></li>
                  <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Item</a></li>
                  <li class="uk-nav-divider"></li>
                  <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: trash"></span> Item</a></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div></div>
    <div class="uk-navbar-center">
      <a class="uk-navbar-item uk-logo" href="/">Logo</a>
    </div>
      <div class="uk-navbar-right"><div>
        <ul class="uk-navbar-nav">
          <li><a href="/login">
            <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
            <span class="uk-visible@m">Zaloguj</span></a></li>
          <li><a href="/cart">
            <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: cart"><span class="uk-badge">{{products}}</span></span>
            <span class="uk-visible@m">Koszyk ({{products}})</span>
          </a>
          </li>
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

