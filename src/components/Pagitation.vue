<template>
  <div>
    <ul class="uk-pagination" uk-margin v-if="numberOfPages<7 && numberOfPages>1">
      <li><a><span uk-pagination-previous></span></a></li>
      <li class="page" v-for="page in (1,numberOfPages)"><a @click="changePage(page)">{{page}}</a></li>
      <li><a><span uk-pagination-next></span></a></li>
    </ul>
    <ul class="uk-pagination" uk-margin v-if="numberOfPages>6">
      <li><a><span uk-pagination-previous></span></a></li>
      <li v-for="page in (1,3)"><a>{{page}}</a></li>
      <li class="uk-disabled"><span>...</span></li>
      <li class="page"><a>{{numberOfPages-2}}</a></li>
      <li class="page"><a>{{numberOfPages-1}}</a></li>
      <li class="page"><a>{{numberOfPages}}</a></li>
      <li class="page"><a><span uk-pagination-next></span></a></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Pagitation",
        props: ['numberOfPages'],
    }
</script>

<style scoped>

</style>
