<template>
    <div>
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
            <vk-icon class="uk-form-icon" :class="{ 'error-message': errors.has('haslo') }" icon="lock"></vk-icon>
            <input class="uk-input" :class="{ 'uk-form-danger': errors.has('haslo') }" type="password" placeholder="Hasło" v-model="input_signin.password" v-validate="'required'" name="haslo">
          </div>
          <p class="error-message">{{ errors.first('haslo') }}</p>
        </div>
      </form>
      <br>
      <p class="error-message" v-if="errorMessage!==null">{{errorMessage}}</p>
      <br>
      <div class="mybtn">
        <button class="uk-button uk-button-secondary uk-inline uk-width-1-1 uk-width-2-3@s uk-width-1-2@l" type="submit" @click="signup"> Zarejestruj</button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "SignUp",
      data() {
        return {
          errorMessage: null,
          input_signin: {
            username: '',
            password: '',
            firstname: '',
            surname: "",
          },
          userExist: false,
          logging: false,
        }
      },
      methods: {
        signup() {
          this.errorMessage =null;
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.$http.post('signup', {
                username: this.input_signin.username,
                password: this.input_signin.password,
                firstname: this.input_signin.firstname,
                lastname: this.input_signin.surname,
              })
                .then((response) => {
                  this.$router.push({name: 'signin'})
                })
                .catch(e => {
                  console.log('error rejestracja');
                  this.errorMessage = e.response.data.message;
                })
            }
          });
        }
      }
    }
</script>

<style scoped>
  .error-message{
    margin-top: 0px;
    color: #f0506e;
  }
</style>
