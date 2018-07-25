<template>
  <v-footer 
    class="pa-3 tertiary justify-center" 
    :app="$store.state.user.role == 'regular'" 
    :absolute="$store.state.user.role == 'regular'"
    dark>
    <v-spacer></v-spacer>
    <div>&copy; <strong>vidalCreates</strong> {{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>

</style>
