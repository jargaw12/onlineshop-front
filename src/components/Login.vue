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
            <form>
              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: user"></span>
                  <input class="uk-input" type="text" placeholder="Login lub e-mail">
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-inline uk-width-2-3">
                  <span class="uk-form-icon" uk-icon="icon: lock"></span>
                  <input class="uk-input" type="password" placeholder="Hasło">
                </div>
              </div>
              <div>
                <label class="uk-align-left uk-width-2-3"><input class="uk-checkbox" type="checkbox"> Zapamiętaj mnie</label>
              </div>
            </form>
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3">Zaloguj</button>
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
            <div class="mybtn">
              <button class="uk-button uk-button-secondary uk-width-2-3">Zarejestruj</button>
            </div>
          </div></li>
        </ul>
        <!--<hr>-->
        <!--<ul class="uk-switcher switcher-container uk-margin">-->
          <!--<li>-->
         <!--<span>-->
          <!--<h5>Nie masz konta? <a href="" @click="UIkit.switcher('#sw').show(1)">Zarejestruj się</a></h5>-->
         <!--</span>-->
          <!--</li>-->
          <!--<li>-->
          <!--<span>-->
          <!--<h5>Masz już konto? <a href="" @click="UIkit.switcher('#sw').show(0)">Zaloguj się</a></h5>-->
         <!--</span>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
    </div>
    <br>

  </div>
</template>

<script>
    export default {
      name: "Login"
    }
</script>

<style scoped>
  .uk-card-body {
    padding-left: 15%;
    padding-right: 15%;
  }
  .uk-margin{
    text-align: center;
  }
  /*.uk-margin .label{*/
    /*text-align: left;*/
    /*padding-left: 19%;*/
    /*line-height: 0em ;*/
  /*}*/
  .uk-input{
    width: 100%;
  }

  .mybtn{
    text-align: center;
  }
  .c-right{
    padding-right: 19%;
    text-align: right;
  }

</style>
