<template>
  <div class="uk-container">
    <!--<vk-offcanvas-content>-->
      <!--<vk-navbar transparent>-->
        <!--<vk-navbar-nav class="uk-visible@m" slot="left">-->
          <!--<vk-navbar-nav-dropdown title="Kategorie" navbar-aligned justified  v-for="g in categories" :key="g.id">-->
            <!--<vk-navbar-nav-dropdown-nav>-->
              <!--<vk-nav-item-header title="Kobiety"></vk-nav-item-header>-->
              <!--<vk-nav-item title="Odzież" active></vk-nav-item>-->
              <!--<vk-nav-item title="Sukienki"></vk-nav-item>-->
              <!--<vk-nav-item title="Swetry i bluzy"></vk-nav-item>-->
              <!--<vk-nav-item title="Spodnie"></vk-nav-item>-->
              <!--<vk-nav-item title="Spódnice"></vk-nav-item>-->
              <!--<vk-nav-item-divider></vk-nav-item-divider>-->
              <!--<vk-nav-item title="Obuwie" active></vk-nav-item>-->
              <!--<vk-nav-item title="Trampki" ></vk-nav-item>-->
              <!--<vk-nav-item title="Półbuty"></vk-nav-item>-->
              <!--<vk-nav-item title="Botki"></vk-nav-item>-->
              <!--<vk-nav-item title="Szpilki"></vk-nav-item>-->
              <!--<vk-nav-item title="Baleriny"></vk-nav-item>-->
              <!--<vk-nav-item title="Akcesoria" active></vk-nav-item>-->
            <!--</vk-navbar-nav-dropdown-nav>-->
            <!--<vk-navbar-nav-dropdown-nav>-->
              <!--<vk-nav-item-header title="Mężczyźni"></vk-nav-item-header>-->
              <!--<vk-nav-item title="Odzież" active @click="toList"></vk-nav-item>-->
              <!--<vk-nav-item title="Koszulki"></vk-nav-item>-->
              <!--<vk-nav-item title="Koszule"></vk-nav-item>-->
              <!--<vk-nav-item title="Bluzy i swetry"></vk-nav-item>-->
              <!--<vk-nav-item title="Spodnie"></vk-nav-item>-->
              <!--<vk-nav-item-divider></vk-nav-item-divider>-->
              <!--<vk-nav-item title="Obuwie" active></vk-nav-item>-->
              <!--<vk-nav-item title="Trampki"></vk-nav-item>-->
              <!--<vk-nav-item title="Półbuty"></vk-nav-item>-->
              <!--<vk-nav-item title="Biznesowe"></vk-nav-item>-->
              <!--<vk-nav-item title="Akcesoria" active></vk-nav-item>-->
            <!--</vk-navbar-nav-dropdown-nav>-->
          <!--</vk-navbar-nav-dropdown>-->
        <!--</vk-navbar-nav>-->
        <!--<vk-navbar-nav class="uk-hidden@m" slot="left">-->
          <!--<vk-navbar-toggle  @click="defaultNav = true"></vk-navbar-toggle>-->
        <!--</vk-navbar-nav>-->

        <!--<vk-navbar-logo slot="center" class="uk-link-reset uk-active"><a href="/">Logo</a></vk-navbar-logo>-->

        <!--<vk-navbar-nav slot="right">-->
          <!--&lt;!&ndash;<vk-navbar-nav-item icon="search"></vk-navbar-nav-item>&ndash;&gt;-->
          <!--<vk-nav-item v-if="!authenticated" class="uk-visible@m" href="/login" title="Zaloguj"></vk-nav-item>-->
          <!--<vk-nav-item v-if="authenticated" class="uk-visible@m" href="/account" title="Konto"></vk-nav-item>-->
          <!--<vk-navbar-nav-item class="uk-hidden@m" href="/login" icon="user" title=""></vk-navbar-nav-item>-->
          <!--<vk-nav-item class="uk-visible@m" :title="'Koszyk ('+count+')'" href="/cart"></vk-nav-item>-->
          <!--<vk-navbar-nav-item class="uk-hidden@m" icon="cart" href="/cart" :title="'('+count+')'"></vk-navbar-nav-item>-->
          <!--<vk-nav-item class="uk-visible@m" v-if="authenticated" icon="sign-out" @click="logout" title=""></vk-nav-item>-->
        <!--</vk-navbar-nav>-->
      <!--</vk-navbar>-->

      <!--<vk-offcanvas overlay :show.sync="defaultNav">-->
        <!--<vk-nav class="uk-margin-auto-vertical">-->
          <!--<h3>Logo</h3>-->
          <!--<vk-nav-item-parent title="Kobiety">-->
            <!--<vk-nav-item-parent title="Odzież" @click="toList">-->
              <!--<vk-nav-item title="Sukienki"></vk-nav-item>-->
              <!--<vk-nav-item title="Swetry i bluzy"></vk-nav-item>-->
              <!--<vk-nav-item title="Spodnie"></vk-nav-item>-->
              <!--<vk-nav-item title="Spódnice"></vk-nav-item>-->
            <!--</vk-nav-item-parent>-->
            <!--<vk-nav-item-parent title="Obuwie" >-->
              <!--<vk-nav-item title="Trampki" ></vk-nav-item>-->
              <!--<vk-nav-item title="Półbuty"></vk-nav-item>-->
              <!--<vk-nav-item title="Botki"></vk-nav-item>-->
              <!--<vk-nav-item title="Szpilki"></vk-nav-item>-->
              <!--<vk-nav-item title="Baleriny"></vk-nav-item>-->
            <!--</vk-nav-item-parent>-->
            <!--<vk-nav-item title="Akcesoria"></vk-nav-item>-->
          <!--</vk-nav-item-parent>-->
          <!--<vk-nav-item-parent title="Mężczyźni">-->
            <!--<vk-nav-item-parent title="Odzież" @click="toList">-->
              <!--<vk-nav-item title="Koszulki"></vk-nav-item>-->
              <!--<vk-nav-item title="Koszule"></vk-nav-item>-->
              <!--<vk-nav-item title="Bluzy i swetry"></vk-nav-item>-->
              <!--<vk-nav-item title="Spodnie"></vk-nav-item>-->
            <!--</vk-nav-item-parent>-->
            <!--<vk-nav-item-parent title="Obuwie" >-->
              <!--<vk-nav-item title="Trampki"></vk-nav-item>-->
              <!--<vk-nav-item title="Półbuty"></vk-nav-item>-->
              <!--<vk-nav-item title="Biznesowe"></vk-nav-item>-->
              <!--<vk-nav-item title="Akcesoria" active></vk-nav-item>-->
            <!--</vk-nav-item-parent>-->
            <!--<vk-nav-item title="Akcesoria"></vk-nav-item>-->
          <!--</vk-nav-item-parent>-->
          <!--<vk-nav-item-header v-if="authenticated" title="Konto"></vk-nav-item-header>-->
          <!--<vk-nav-item v-if="authenticated" title="Konto" icon="user"></vk-nav-item>-->
          <!--<vk-nav-item v-if="authenticated" :title="'Koszyk ('+count+')'" icon="cart"></vk-nav-item>-->
          <!--<vk-nav-item v-if="authenticated" title="Zamówienia" icon="credit-card"></vk-nav-item>-->
          <!--<vk-nav-item-divider></vk-nav-item-divider>-->
          <!--<vk-nav-item v-if="authenticated" title="Wyloguj" icon="sign-out" @click="logout"></vk-nav-item>-->
        <!--</vk-nav>-->
      <!--</vk-offcanvas>-->
    <!--</vk-offcanvas-content>-->
    <!--<vk-notification messages="Dodano do koszyka" timeout="1000">-->
      <!--<div slot-scope="{ message }">-->
        <!--<vk-icon icon="cart"></vk-icon> {{ message }}-->
      <!--</div>-->
    <!--</vk-notification>-->

    <div class="uk-offcanvas-content">
      <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
        <div class="uk-navbar-left uk-visible@m">
            <ul class="uk-navbar-nav">
              <li :class="{'uk-active' : group.id===g.id}" v-for="g in menuState.categories" :key="g.id">
                <a @click="changeGroup(g.id)">{{g.name}}</a>
              </li>
            </ul>
        </div>
        <div class="uk-navbar-left uk-hidden@m">
          <ul class="uk-navbar-nav">
            <li class="uk-hidden@m">
              <a class="uk-navbar-toggle uk-hidden@m" href="#" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
            </li>
            <li class="uk-hidden@m"><a class="uk-navbar-item uk-logo" href="/">Logo</a></li>
          </ul>
        </div>
        <div class="uk-navbar-center uk-visible@m">
          <a class="uk-navbar-item uk-logo" href="/">Logo</a>
        </div>
        <div class="uk-navbar-right"><div>
          <ul class="uk-navbar-nav">
            <li v-if="!authenticated"><a href="/login">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
              <span class="uk-visible@m">Zaloguj</span></a></li>
            <li v-if="authenticated"><a href="/account">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
              <span class="uk-visible@m">Konto</span></a></li>
            <li><a href="/cart">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: cart"></span>
              <span class="uk-hidden@m">({{count}})</span>
              <span class="uk-visible@m">Koszyk ({{count}})</span>
            </a>
            </li>
            <li v-if="authenticated">
              <a @click="logout">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: sign-out"></span>
              </a>
            </li>
          </ul>
        </div></div>

        <!-- Mobile menu -->
      </nav>
      <nav class="uk-navbar-container uk-margin uk-navbar-transparent uk-visible@m" uk-navbar>
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav">
            <li v-for="c in group.categories" :key="c.id">
              <a @click="toList(c.id)">
                {{c.categoryname.name}}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <nav id="offcanvas-nav" uk-offcanvas="overlay: false">
      <div class="uk-offcanvas-bar uk-flex uk-flex-column">

        <a class="uk-align-left uk-logo" href="#">Logo</a>
        <!-- B - nav -->
        <ul class="uk-nav uk-nav-parent-icon" uk-nav>
          <li class="uk-parent" v-for="g in menuState.categories" :key="g.id">
            <a href="#">{{g.name}}</a>
            <ul class="uk-nav-sub">
              <li class="uk-parent" v-for="c in g.categories" :key="c.id">
                <a href="#">{{c.categoryname.name}}</a>
                <ul class="uk-nav-sub"><li v-for="s in c.subcategories" :key="s.id"><a>{{s.name}}</a></li></ul>
              </li>
            </ul>
          </li>
          <li class="uk-nav-divider"></li>
          <!--<li class="uk-nav-header">Konto</li>-->
          <li v-if="authenticated"><a>Konto</a></li>
          <li><a>Koszyk {{'('+count+')'}}</a></li>
          <li v-if="authenticated"><a>Zamówienia</a></li>
          <li v-if="authenticated"><a>Wyloguj</a></li>
        </ul>


          <!--<vk-nav-item-header v-if="authenticated" title="Konto"></vk-nav-item-header>-->
          <!--<vk-nav-item v-if="authenticated" title="Konto" icon="user"></vk-nav-item>-->
          <!--<vk-nav-item v-if="authenticated" :title="'Koszyk ('+count+')'" icon="cart"></vk-nav-item>-->
          <!--<vk-nav-item v-if="authenticated" title="Zamówienia" icon="credit-card"></vk-nav-item>-->
          <!--<vk-nav-item-divider></vk-nav-item-divider>-->
          <!--<vk-nav-item v-if="authenticated" title="Wyloguj" icon="sign-out" @click="logout"></vk-nav-item>-->
      </div>
    </nav>
  </div>
</template>

<script>
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
      },
      menuState() {
        return this.$store.state.menu
      },
      group() {
        return this.$store.getters.getGroup
      },
      category() {
        return this.$store.getters.getCategory
      },
      productPath(){
          return (this.group.name.toLowerCase()  +"/"+ this.category.categoryname.name.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      },
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
      toList(id){
        this.$store.commit('setActiveCategory',id);
        this.$store.commit('setActiveSubcategory',);
        this.$store.commit('setPageNumber',1);
        this.$router.push({name:'Product List',params:{group:this.group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") ,category: this.category.categoryname.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}, query: { page: 1, size: this.$store.state.page.size }});
      },
      changeGroup(group){
        console.log("Activegroup id: " + group)
        this.$store.commit('setActiveGroup',group);
        this.$router.push({name:'Home', params:{sex: this.group.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}})
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

  .uk-offcanvas-bar{
    olor: #666;
  }

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
