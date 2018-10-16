<template>
  <div >
    <br>
    <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
      </div>
      <div class="uk-card-body">
        <ul class="uk-child-width-expand" uk-tab uk-switcher="animation: uk-animation-fade" id="sw">
          <li><a href="#">Zaloguj</a></li>
          <li><a href="#">Zarejestruj</a></li>
        </ul>
        <ul class="uk-switcher switcher-container uk-margin">
          <li><div>
            <form class="uk-form-stacked">
              <div class="uk-grid-medium uk-child-width-2-3 uk-grid uk-grid-stack" uk-grid="">
                <fieldset class="uk-fieldset uk-first-column">
                  <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-1@s uk-grid" uk-grid="">
                    <div class="uk-first-column"><label>
                      <div class="uk-form-label">Login/e-mail</div>
                      <div class="uk-inline uk-width-2-3">
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                        <input class="uk-input" type="text" placeholder="Login lub e-mail" v-model="username">
                      </div>
                    </label>
                    </div>
                    <div><label>
                      <div class="uk-form-label">Hasło</div>
                      <div class="uk-inline uk-width-2-3">
                        <span class="uk-form-icon" uk-icon="icon: lock"></span>
                        <input class="uk-input" type="password" placeholder="Hasło" v-model="password">
                      </div>
                    </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </form>
            <!--<form>-->
              <!--<div class="uk-margin">-->
                <!--<div class="uk-inline uk-width-2-3">-->
                  <!--<span class="uk-form-icon" uk-icon="icon: user"></span>-->
                  <!--<input class="uk-input" type="text" placeholder="Login lub e-mail">-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="uk-margin">-->
                <!--<div class="uk-inline uk-width-2-3">-->
                  <!--<span class="uk-form-icon" uk-icon="icon: lock"></span>-->
                  <!--<input class="uk-input" type="password" placeholder="Hasło">-->
                <!--</div>-->
              <!--</div>-->
              <!--<div>-->
                <!--<label class="uk-align-left uk-width-2-3"><input class="uk-checkbox" type="checkbox"> Zapamiętaj mnie</label>-->
              <!--</div>-->
            <!--</form>-->
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3" type="submit" @click="login">Zaloguj</button>
            </div>
            <a class=" uk-width-1-2 c-right">Zapomniałeś hasła?</a>
          </div></li>

          <li><div>
            <form>
              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: user"></span>
                  <input class="uk-input" type="text" placeholder="Imię">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: users"></span>
                  <input class="uk-input" type="text" placeholder="Nazwisko">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: mail"></span>
                  <input class="uk-input" type="text" placeholder="E-mail">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: lock"></span>
                  <input class="uk-input" type="password" placeholder="Hasło">
                </div>
              </div>
            </form>
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3" type="submit" @click="login">Zarejestruj</button>
            </div>
          </div></li>
        </ul>
      </div>
    </div>
    <br>

  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "Login",
      data() {
        return {
          username: '',
          password: '',
        }
      },
      methods:{
        login() {
          const params = new URLSearchParams();
          params.append('grant_type', 'password');
          params.append('username', this.username);
          params.append('password', this.password);
          axios({
            method:'post',
            url:'http://localhost:8080/oauth/token',
            auth:{username:'frontclient',password: 'frontpassword'},
            headers:{"Content-Type": "application/x-www-form-urlencoded"},
            data:params,
          })
            .then(function (response) {
              document.cookie="acces_token=" + response.data.access_token + ";path=/";
              this.$router.push({name: "Home"});
            });
        }
      }

      // signup(context, creds, redirect) {
      //   context.$http.post(SIGNUP_URL, creds, (data) => {
      //     localStorage.setItem('id_token', data.id_token)
      //     localStorage.setItem('access_token', data.access_token)
      //
      //     this.user.authenticated = true
      //
      //     if(redirect) {
      //       router.go(redirect)
      //     }
      //
      //   }).error((err) => {
      //     context.error = err
      //   })
      // },
      //
      // // To log out, we just need to remove the token
      // logout() {
      //   localStorage.removeItem('id_token')
      //   localStorage.removeItem('access_token')
      //   this.user.authenticated = false
      // },
      //
      // checkAuth() {
      //   var jwt = localStorage.getItem('id_token')
      //   if(jwt) {
      //     this.user.authenticated = true
      //   }
      //   else {
      //     this.user.authenticated = false
      //   }
      // },
      //
      // // The object to be passed as a header for authenticated requests
      // getAuthHeader() {
      //   return {
      //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      //   }
      // }
    }
</script>

<style scoped>
  /*.uk-card-body {*/
    /*padding-left: 15%;*/
    /*padding-right: 15%;*/
  /*}*/
  /*.uk-margin{*/
    /*text-align: center;*/
  /*}*/
  /*!*.uk-margin .label{*!*/
    /*!*text-align: left;*!*/
    /*!*padding-left: 19%;*!*/
    /*!*line-height: 0em ;*!*/
  /*!*}*!*/
  /*.uk-input{*/
    /*width: 100%;*/
  /*}*/

  /*.mybtn{*/
    /*text-align: center;*/
  /*}*/
  /*.c-right{*/
    /*padding-right: 19%;*/
    /*text-align: right;*/
  /*}*/

</style>
