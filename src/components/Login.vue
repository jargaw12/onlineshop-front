<template>
  <div >
    <br>
    <vk-card>
      <div class="uk-margin-medium-top">
        <vk-tabs align="justify">

          <vk-tabs-item title="Zaloguj">
            <form class="uk-form-stacked">
              <!--<div class="uk-grid-medium uk-child-width-2-3 uk-grid uk-grid-stack" uk-grid="">-->
              <fieldset class="uk-fieldset uk-first-column">
                <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-1@s uk-grid" uk-grid="">
                  <div class="uk-first-column"><label>
                    <div class="uk-form-label">Login/e-mail</div>
                    <div class="uk-inline uk-width-2-3">
                      <vk-icon class="uk-form-icon" icon="user"></vk-icon>
                      <input class="uk-input" type="text" placeholder="Login lub e-mail" v-model="input_login.username">
                    </div>
                  </label>
                  </div>
                  <div><label>
                    <div class="uk-form-label">Hasło</div>
                    <div class="uk-inline uk-width-2-3">
                      <vk-icon class="uk-form-icon" icon="lock"></vk-icon>
                      <input class="uk-input" type="password" placeholder="Hasło" v-model="input_login.password">
                    </div>
                  </label>
                  </div>
                </div>
              </fieldset>
              <!--</div>-->
            </form>
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3" type="submit" @click="login(input_login)">Zaloguj</button>
            </div>
            <a class=" uk-width-1-2 c-right">Zapomniałeś hasła?</a>
          </vk-tabs-item>

          <vk-tabs-item title="Zarejestruj">
            <form action="Home.vue">
              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <vk-icon class="uk-form-icon" icon="user"></vk-icon>
                  <input class="uk-input" type="text" placeholder="Imię" v-model="input_signin.firstname">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <vk-icon class="uk-form-icon" icon="users"></vk-icon>
                  <input class="uk-input" type="text" placeholder="Nazwisko" v-model="input_signin.surname">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <vk-icon class="uk-form-icon" icon="mail"></vk-icon>
                  <input class="uk-input" type="text" placeholder="E-mail" v-model="input_signin.username">
                </div>
              </div>

              <div v-show="userExist" class="uk-alert-danger uk-width-2-3" uk-alert>
                <p>Użytkownik o podanym adresie e-mail już istnieje</p>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <vk-icon class="uk-form-icon" icon="lock"></vk-icon>
                  <input class="uk-input" type="password" placeholder="Hasło" v-model="input_signin.password">
                </div>
              </div>
            </form>
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3" type="submit" @click="signup">Zarejestruj</button>
            </div>
          </vk-tabs-item>
        </vk-tabs>
      </div>
    </vk-card>

  </div>
</template>

<script>
  import store from "../store"
  import axios from 'axios'
  export default {
    name: "Login",
    data() {
      return {
        input_login:{
          username: '',
          password: '',
        },
        input_signin:{
          username: '',
          password: '',
          firstname: '',
          surname: "",
        },
        userExist:false,
      }
    },
    methods:{
      login(input_login) {
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', input_login.username);
        params.append('password', input_login.password);
        axios({
          method:'post',
          url:'http://localhost:8080/oauth/token',
          auth:{username:'frontclient',password: 'frontpassword'},
          // headers:{"Content-Type": "application/x-www-form-urlencoded"},
          data:params,
        })
          .then(function (response) {
            document.cookie="acces_token=" + response.data.access_token + ";path=/";
            store.commit('setUser', input_login.username);
            store.commit('setAuth', true);
            localStorage.setItem('user-token', token);
            // this.$route.push({name: "Home"});
          }).catch(e=>localStorage.removeItem('user-token'));
      },
      signup(){
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers:{
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        });
        api.post('signup',{
          username: this.input_signin.username,
          password: this.input_signin.password
        })
          .then(this.userExist=false)
          .catch(e => {
            this.userExist=true;
            console.log('error rejestracja');
          })
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
