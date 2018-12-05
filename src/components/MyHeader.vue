<template>
  <div class="uk-container">

    <div class="uk-offcanvas-content">
      <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar="dropbar: true; dropbar-mode: push">
        <div class="uk-navbar-left uk-visible@m">
            <ul class="uk-navbar-nav">
              <li v-for="g in this.ccc" :key="g.id">
                <a>{{g.name}}</a>
                <div class="uk-navbar-dropdown" uk-drop="boundary: !nav; boundary-align: true; pos: bottom-justify;">
                    <div class="uk-navbar-dropdown-grid uk-child-width-1-3" uk-grid>
                      <div v-for="c in g.categories">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                          <!--<li class="uk-active"><a href="#">{{c.categoryname.name}}</a></li>-->
                          <li class="uk-active"><router-link :to="{name:'Product List',params:{group:g.name.toLowerCase(),category:c.categoryname.name.toLowerCase()}}">{{c.categoryname.name}}</router-link></li>
                          <li v-for="s in c.subcategories"><router-link :to="{name:'Product List',params:{group:g.name.toLowerCase(),category:c.categoryname.name.toLowerCase(), subcategory: s.subcategoryname.name.toLowerCase()}}">{{s.subcategoryname.name}}</router-link></li>
                        </ul>
                      </div>
                </div></div>
              </li>
            </ul>
        </div>
        <div class="uk-navbar-left uk-hidden@m">
          <ul class="uk-navbar-nav">
            <li class="uk-hidden@m">
              <a class="uk-navbar-toggle uk-hidden@m" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
            </li>
            <li class="uk-hidden@m">
              <div class="frame"><router-link :to="{path:'/'}"><img src="@/assets/logo3.jpg"/></router-link></div>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-center uk-visible@m">
          <div><router-link :to="{path:'/'}"><img src="@/assets/logo2.jpg"/></router-link></div>
        </div>
        <div class="uk-navbar-right"><div>
          <ul class="uk-navbar-nav">
            <li v-if="!authenticated"><router-link :to="{name:'login'}">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
              <span class="uk-visible@m">Zaloguj</span></router-link></li>
            <li v-if="authenticated"><router-link :to="{name:'account'}">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: user"></span>
              <span class="uk-visible@m">Konto</span></router-link></li>
            <li><router-link :to="{name:'cart'}">
              <span class="uk-icon uk-margin-small-right uk-hidden@m" uk-icon="icon: cart"></span>
              <span class="uk-hidden@m">({{count}})</span>
              <span class="uk-visible@m">Koszyk ({{count}})</span>
            </router-link>
            </li>
            <li v-if="authenticated">
              <a @click="logout">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: sign-out"></span>
              </a>
            </li>
          </ul>
        </div></div>
      </nav>

    </div>
    <nav id="offcanvas-nav" uk-offcanvas="overlay: true">
      <div class="uk-offcanvas-bar uk-flex uk-flex-column">

        <!--<router-link class="uk-align-left uk-logo" :to="{name:'home'}"><img src="@/assets/logo2.jpg"/></router-link>-->
        <!--<img src="@/assets/logo3.jpg"/>-->
        <!-- B - nav -->
        <ul class="uk-nav uk-nav-parent-icon" uk-nav>
          <li class="uk-parent" v-for="g in this.ccc" :key="g.id">
            <a>{{g.name}}</a>
            <ul class="uk-nav-sub">
              <li class="uk-parent" v-for="c in g.categories" :key="c.id">
                <router-link :to="{name:'Product List',params:{group:g.name.toLowerCase(),category:c.categoryname.name.toLowerCase()}}">{{c.categoryname.name}}</router-link>
                <ul class="uk-nav-sub">
                  <li v-for="s in c.subcategories" :key="s.id">
                  <li v-for="s in c.subcategories"><router-link :to="{name:'Product List',params:{group:g.name.toLowerCase(),category:c.categoryname.name.toLowerCase(), subcategory: s.subcategoryname.name.toLowerCase()}}">{{s.subcategoryname.name}}</router-link>
                  </li></ul>
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
    props:['menuData'],
    data() {
      return {
        defaultNav: false,
        ccc:[],
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      },
      authenticated() {
        return this.$store.getters.isLoggedIn;
      },
      group() {
        return this.$store.getters.getGroup
      },
      category() {
        return this.$store.getters.getCategory
      },
    },
    created() {
      this.$http.get('/menu/groups')
        .then(response => {
          // this.groups=response.data;
          console.log("Grupy 1/2 ");
          this.$store.commit('setCategories',response.data);
          this.ccc=response.data;
          console.log("Grupy 2/2 " + response.data);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        // localStorage.removeItem('user-token');
        // delete axios.defaults.headers.common["Authorization"];
        // this.$store.commit('setAuth',false);
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

  .frame {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
