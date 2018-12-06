<template>
  <div class="uk-container">
    <br>
    <vk-card>
      <div class="uk-margin-medium-top">
        <vk-tabs align="justify">

          <vk-tabs-item title="Zaloguj">
            <form class="uk-form-stacked">
              <!--<div class="uk-grid-medium uk-child-width-2-3 uk-grid uk-grid-stack" uk-grid="">-->
              <fieldset class="uk-fieldset uk-first-column">
                <div class="uk-grid-small uk-child-width-1-1 uk-grid uk-container">
                  <div class="uk-alert-danger" uk-aler v-if="error!==null">{{error}}</div>
                  <div class="uk-first-column"><label>
                    <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('e-mail') }">Login/e-mail</div>
                    <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                      <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('e-mail') }" icon="user"></vk-icon>
                      <input class="uk-input" :class="{ 'uk-form-danger': errors.has('e-mail') }" type="text" placeholder="Login lub e-mail" v-model="input_login.username" v-validate="'required|email'" name="e-mail">
                    </div>
                    <p class="error-message">{{ errors.first('e-mail') }}</p>
                  </label>
                  </div>
                  <div><label>
                    <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('hasło') }">Hasło</div>
                    <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                      <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('hasło') }" icon="lock"></vk-icon>
                      <input class="uk-input" :class="{ 'uk-form-danger': errors.has('hasło') }" type="password" placeholder="Hasło" v-model="input_login.password" v-validate="'required'" name="hasło" @keyup.enter="login(input_login)">
                    </div>
                    <p class="error-message">{{ errors.first('hasło') }}</p>
                  </label>
                  </div>
                </div>
              </fieldset>
              <!--</div>-->
            </form>
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-1-1 uk-width-2-3@s uk-width-1-2@l" type="submit" @click="login(input_login)" ><span class="uk-margin-small" v-if="!logging">Zaloguj</span><span uk-spinner="ratio: 0.6" v-if="logging"></span></button>
            </div>
            <a class=" uk-width-1-2 c-right">Zapomniałeś hasła?</a>
          </vk-tabs-item>

          <vk-tabs-item title="Zarejestruj">
            <form action="Home.vue">
              <div class="uk-margin">
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('imię') }">Imię</div>
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                  <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('imię') }" icon="user"></vk-icon>
                  <input class="uk-input" :class="{ 'uk-form-danger': errors.has('imię') }" type="text" placeholder="Imię" v-model="input_signin.firstname" v-validate="'required'" name="imię">
                </div>
                <p class="error-message">{{ errors.first('imię') }}</p>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('nazwisko') }">Nazwisko</div>
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                  <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('nazwisko') }" icon="users"></vk-icon>
                  <input class="uk-input" :class="{ 'uk-form-danger': errors.has('nazwisko') }" type="text" placeholder="Nazwisko" v-model="input_signin.surname" v-validate="'required'" name="nazwisko">
                </div>
                <p class="error-message">{{ errors.first('nazwisko') }}</p>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('email') }">Adres e-mail</div>
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                  <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('email') }" icon="mail"></vk-icon>
                  <input class="uk-input" :class="{ 'uk-form-danger': errors.has('email') }" type="text" placeholder="E-mail" v-model="input_signin.username" v-validate="'required|email'" name="email">
                </div>
                <p class="error-message">{{ errors.first('email') }}</p>
              </div>

              <div v-show="userExist" class="uk-alert-danger uk-width-2-3" uk-alert>
                <p>Użytkownik o podanym adresie e-mail już istnieje</p>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('haslo') }">Hasło</div>
                <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container">
                  <vk-icon class="uk-form-icon" icon="lock"></vk-icon>
                  <input class="uk-input" :class="{ 'uk-form-danger': errors.has('haslo') }" type="password" placeholder="Hasło" v-model="input_signin.password" v-validate="'required'" name="haslo">
                </div>
                <p class="error-message">{{ errors.first('haslo') }}</p>
              </div>
            </form>
            <br><br>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l" type="submit" @click="signup"> Zarejestruj</button>
            </div>
          </vk-tabs-item>
        </vk-tabs>
      </div>
    </vk-card>

    <!--<vk-card>-->
      <!--<div class="uk-container uk-width-1-2">-->
        <!--<input class="uk-input" type="text" placeholder="E-mail">-->
      <!--</div>-->
    <!--</vk-card>-->

  </div>
</template>

<script>
  // import router from '../router'
  // import store from "../store"
  // import axios from 'axios'
  export default {
    name: "Login",
    data() {
      return {
        input_login:{
          username: '',
          password: '',
        },
        error:null,
        input_signin:{
          username: '',
          password: '',
          firstname: '',
          surname: "",
        },
        userExist:false,
        logging:false,
      }
    },
    methods:{
      login(input_login) {
        this.$validator.validateAll().then(() => {
        // if (!this.errors.any()) {
          this.logging = true;
          this.$http.post('oauth/token', {}, {
            params: {
              grant_type: 'password',
              username: input_login.username,
              password: input_login.password
            },
            auth: {username: 'frontclient', password: 'frontpassword'}
          })
            .then((response) => {
              const token = response.data.access_token;
              localStorage.setItem('user-token', token);
              sessionStorage.setItem('user-token', token);
              this.$store.commit('setAuth', true);
              this.$http.get('/shoppingcart/totalquantity')
                .then(response => {
                  this.$store.state.count = response.data;
                  console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
                })
                .catch(e => {
                  console.log("Ilosc w koszyku error: " + e);
                });
              // this.logging = false;
              // this.error = null;
              this.$router.push({name: "home"});
            }).catch(function (error) {
              console.log('Error', error.message);
            console.log(error.config);
            // this.logging = false;
            localStorage.removeItem('user-token');
            sessionStorage.removeItem('user-token');
            if (error.response.status===400)
              this.error = "Błędny login lub hasło";
          });
        });
      },
      signup(){
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.$http.post('signup', {
            username: this.input_signin.username,
            password: this.input_signin.password,
            firstname: this.input_signin.firstname,
            lastname: this.input_signin.surname,
          })
            .then(this.userExist = false)
            .catch(e => {
              this.userExist = true;
              this.$router.push({name: "home"});
              console.log('error rejestracja');
              console.log(e);
              this.error = e.response.data;
            })
        }
      }
    }
  }
</script>

<style scoped>
  .uk-container{
    text-align: center;
  }
  .error-message{
    margin-top: 0px;
    color: #f0506e;
  }
</style>
