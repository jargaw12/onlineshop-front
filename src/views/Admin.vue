<template>
    <div>
        <hea></hea>
        <router-view/>
    </div>
</template>

<script>
  import Hea from '../components/AdminHeader.vue'
    export default {
        name: "Admin",
      components: {
        Hea,
      },
    }
</script>

<style scoped>

</style>
