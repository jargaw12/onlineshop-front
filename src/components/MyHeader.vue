<template>
  <div>
    <div class="uk-offcanvas-content">
    <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
    <!--<div class="uk-navbar-center">-->

      <div class="uk-navbar-left"><div>
        <ul class="uk-navbar-nav">
          <li class="uk-visible@m">
            <a href="#">Kategorie</a>
            <div class="uk-navbar-dropdown" uk-drop="boundary: !nav; boundary-align: true; pos: bottom-justify;">
              <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid>
                <div>
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-divider"></li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
                <div>
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-divider"></li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="uk-hidden@m">
            <a class="uk-navbar-toggle uk-hidden@m" href="#" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
          </li>
          <li class="uk-hidden@m"><a class="uk-navbar-item uk-logo" href="/">Logo</a></li>
        </ul>
      </div></div>
    <div class="uk-navbar-center uk-visible@m">
      <a class="uk-navbar-item uk-logo" href="/">Logo</a>
    </div>
      <div class="uk-navbar-right"><div>
        <ul class="uk-navbar-nav">
          <div class="uk-visible@l">
            <a class="uk-navbar-toggle" uk-search-icon href="#"></a>
            <div class="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
              <form class="uk-search uk-search-navbar uk-width-1-1">
                <input class="uk-search-input" type="search" placeholder="Search..." autofocus>
              </form>
            </div>
          </div>

          <div class="uk-hidden@l">
            <a class="uk-navbar-toggle" href="#" uk-search-icon></a>
            <div class="uk-navbar-dropdown" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-expand">
                  <form class="uk-search uk-search-navbar uk-width-1-1">
                    <input class="uk-search-input" type="search" placeholder="Search..." autofocus>
                  </form>
                </div>
                <div class="uk-width-auto">
                  <a class="uk-navbar-dropdown-close" href="#" uk-close></a>
                </div>
              </div>
            </div>
          </div>
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
    </div>
    <nav id="offcanvas-nav" uk-offcanvas="overlay: false">
      <div class="uk-offcanvas-bar uk-flex uk-flex-column">

        <a class="uk-align-left uk-logo" href="#">Logo</a>
        <!-- B - nav -->
        <ul class="uk-nav uk-nav-parent-icon" uk-nav>
          <li class="uk-active"><a href="#">Active - offcanvas</a></li>
          <li class="uk-parent">
            <a href="#">Parent - offcanvas</a>
            <ul class="uk-nav-sub">
              <li><a href="#">Child one - offcanvas</a></li>
              <li><a href="#">Child two - offcanvas</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
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

<style scoped>

</style>

