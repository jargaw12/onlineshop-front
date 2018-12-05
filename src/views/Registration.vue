<template>
  <div >
    <div class="uk-card uk-card-default uk-width-1-2@m">
      <div class="uk-card-body">
        <ul class="uk-child-width-expand" uk-tab uk-switcher="connect: .switcher-container">
          <li class="uk-active"><a>Zaloguj</a></li>
          <li><a>Zarejestruj</a></li>
        </ul>
        <h4>Container 1</h4>

        <ul class="uk-switcher switcher-container uk-margin">
          <li>Hello!</li>
          <li>Hello again!</li>
        </ul>

        <h4>Container 2</h4>

        <ul class="uk-switcher switcher-container uk-margin">
          <li>Hello! The first item.</li>
          <li>Hello again! The second item.</li>
        </ul>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
      </div>
      <div class="uk-card-footer">
        <a class="uk-button uk-button-text">Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Registration"
  }
</script>

<style scoped>
  .uk-card-title{
    text-align: center;
  }
  .uk-card-footer{
    text-align: center;
  }

  .uk-card-body {
    padding-left: 15%;
    padding-right: 15%;
  }
  .uk-margin{
    text-align: center;
  }
  .uk-margin .label{
    text-align: left;
    padding-left: 19%;
    line-height: 0em ;
  }
  .uk-input{
    width: 100%;
  }

  .mybtn{
    text-align: center;
  }
  .c-left{
    padding-left: 19%;
    /*text-align: left;*/
  }
  .c-right{
    padding-right: 19%;
    text-align: right;
  }

</style>
