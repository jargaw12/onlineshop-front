<template>
  <div class="row">
    <div class="col s12 m12">


      <div class="stepper">
        <ul>
          <li class="complete">
            <label class="stepper-step">1</label>
            <span class="stepper-description">Zatwierdź koszyk
              </span>
          </li>

          <li class="stepper active">
            <label class="stepper-step">2</label>
            <span class="stepper-description">Patnosc
            </span>
          </li>

          <li>
            <label class="stepper-step">3</label>
            <span class="stepper-description">Faktura
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Stepper"
  }
</script>

<style scoped>
  body {
    background-color:lightgrey;
  }

  .stepper>ul{
    position :relative;
    display:table;
    width:100%;
    margin : 0 0 20px;
    list-style:none;
    padding : 0;
  }

  .stepper>ul>li {
    display:table-cell;
    width : 1%;
    text-align:center;
  }

  .stepper>ul>li.active .stepper-step {
    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  }


  .stepper>ul>li .stepper-step {
    line-height: 32px;
    position:relative;
    z-index:5;
    display:inline-block;
    width:30px;
    height:30px;
    margin: 0 auto 5px;
    cursor:pointer;
    text-align:center;
    color: #fff;
    border-radius:100px;
    background : lightgrey;
  }

  .stepper>ul>li.active .stepper-step {
    background-color : #2196F3;
    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .stepper>ul>li.complete .stepper-step {
    background-color : teal;
  }

  /* .stepper>ul>li.complete .stepper-step:after {
      content '1';
      position : relative;
      width :30px;
      height:30px;
      background-color:red;
  } */

  .stepper>ul>li .stepper-description {
    font-size :13px;
    font-weight :700;
    display:inline-block;
  }

  .stepper>ul>li .stepper-description:after {
    content: '';
    background: lightgrey;
    height: 4px;
    width: 80%;
    position: relative;

  }

  .stepper>ul>li .stepper-description small {
    opacity : 0.7;
  }



</style>
