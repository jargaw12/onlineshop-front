<template>
        <div class="uk-container uk-text-center">
          <div class="uk-card uk-card-default uk-card-body">
            <div>
              <ul class="uk-child-width-expand" uk-tab>
                <li @click="toComponent('signin')"><a>Zaloguj</a></li>
                <li @click="toComponent('signup')"><a>Zarejestruj</a></li>
              </ul>
            </div>
            <router-view></router-view>
          </div>
        </div>
</template>

<script>
    export default {
        name: "SignInSignUp",
        methods:{
            toComponent(path){
                this.$router.push({name:path})
            }
        },
        created(){
            this.$router.push({name:'signin'})
        },
    }
</script>

<style scoped>
  .uk-container{
    text-align: center;
  }
</style>
