<template>
    <div>
      <form class="uk-form-stacked">
        <!--<div class="uk-grid-medium uk-child-width-2-3 uk-grid uk-grid-stack" uk-grid="">-->
        <fieldset class="uk-fieldset uk-first-column">
          <div class="uk-grid-small uk-child-width-1-1 uk-grid uk-container">
            <div class="uk-first-column"><label>
              <div class="uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l uk-container uk-text-left uk-form-label" :class="{ 'uk-text-danger': errors.has('e-mail') }">Adres e-mail</div>
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
      <br>
      <!--<div class="uk-alert-danger" uk-aler v-if="errorAlert!==null">{{errorAlert}}</div>-->
      <p class="error-message" v-if="errorAlert!==null">Błędny login lub hasło</p>
      <br>
      <div class="mybtn">
        <button class="uk-button uk-button-secondary uk-width-1-1 uk-width-2-3@s uk-width-1-2@l" type="submit" @click="login(input_login)" ><span class="uk-margin-small" v-if="!logging">Zaloguj</span><span uk-spinner="ratio: 0.6" v-if="logging"></span></button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SignIn",
      data() {
        return {
          input_login:{
            username: '',
            password: '',
          },
          errorAlert:null,
          userExist:false,
          logging:false,
        }
      },
      methods: {
        login(input_login) {
          this.errorAlert=null;
            if (this.isValid) {
              this.logging = true;
              this.$http.post('oauth/token', {}, {
                params: {grant_type: 'password', username: input_login.username, password: input_login.password},
                auth: {username: 'frontclient', password: 'frontpassword'}
              })
                .then((response) => {
                  const token = response.data.access_token;
                  localStorage.setItem('user-token', token);
                  sessionStorage.setItem('user-token', token);
                  this.$store.commit('setAuth', true);
                  this.totalQuantity();
                  this.$router.push({name: "home"});
                })
                .catch(e => {
                console.log('Error', e.message);
                console.log(e.config);
                this.logging = false;
                localStorage.removeItem('user-token');
                sessionStorage.removeItem('user-token');
                if (e.response.status === 400){
                  console.log("ewrewrew");
                  this.errorAlert = "Błędny login lub hasło";
                }
              });
            }
        },
        totalQuantity(){
          this.$http.get('/shoppingcart/totalquantity')
            .then(response => {
              this.$store.state.count = response.data;
              console.log('Pobrano ilośc produktów w koszyku: ' + this.products);
            })
            .catch(e => {
              console.log("Ilosc w koszyku error: " + e);
            });
        },
        isValid() {
          this.$validator.validateAll().then((result) => {
            return !!result;
          });
        },
      }
    }
</script>

<style scoped>
  .error-message{
    margin-top: 0px;
    color: #f0506e;
  }
</style>
