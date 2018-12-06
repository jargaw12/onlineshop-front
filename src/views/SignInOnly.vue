<template>
        <div class="uk-container uk-text-center">
          <div class="uk-card uk-card-default">
            <div class="uk-card-header">
              Zaloguj
            </div>
            <div class="uk-card-body">
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
              <p class="error-message" v-if="errorAlert!==null">{{errorAlert}}</p>
              <br>
              <div class="mybtn">
                <button class="uk-button uk-button-secondary uk-width-1-1 uk-width-2-3@s uk-width-1-2@l" type="submit" @click="login(input_login)" ><span class="uk-margin-small" v-if="!logging">Zaloguj</span><span uk-spinner="ratio: 0.6" v-if="logging"></span></button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
    export default {
        name: "SignInSignUp",
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
        methods:{
          login(input_login) {
            this.errorAlert=null;
            if (this.isValid) {
              this.logging = true;
              this.$http_admin.post('oauth/token', {}, {
                params: {grant_type: 'password', username: input_login.username, password: input_login.password},
                auth: {username: 'frontclient', password: 'frontpassword'}
              })
                .then((response) => {
                  const token = response.data.access_token;
                  localStorage.setItem('admin-token', token);
                  this.$store.commit('setAdminAuth', true);
                  this.$http_admin.get('account')
                    .then((response)=>{
                      if (response.data.roles.some(e => e.name === 'ADMIN')){
                        this.logging = false;
                        this.$router.push({name: "addProduct"});
                      }
                      else {
                        this.logging = false;
                        this.errorAlert = "Brak uprawnień";
                        this.$store.dispatch('adminLogout');
                      }
                    })
                    .catch((e)=>{
                      console.log("Error: "+e)
                    })
                })
                .catch(e => {
                  console.log('Error', e.message);
                  console.log(e.config);
                  this.logging = false;
                  localStorage.removeItem('admin-token');
                  if (e.response.status === 400){
                    console.log("Błędny login lub hasło");
                    this.errorAlert = "Błędny login lub hasło";
                  }
                });
            }
          },
          isValid() {
            this.$validator.validateAll().then((result) => {
              return !!result;
            });
          },
        },
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
