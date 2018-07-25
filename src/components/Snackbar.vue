<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      :color="$store.state.snackbar.color"
      :left="$store.state.snackbar.x === 'left'"
      :right="$store.state.snackbar.x === 'right'"
      :top="$store.state.snackbar.y === 'top'"
      :bottom="$store.state.snackbar.y === 'bottom'"
      :multi-line="$store.state.snackbar.mode === 'multi-line'"
      :vertical="$store.state.snackbar.mode === 'vertical'"
      :timeout="$store.state.snackbar.timeout"
    >
      {{ $store.state.snackbar.text }}
      <v-btn color="white" flat @click="$store.dispatch('setSnackbar', {show: false})" icon><v-icon>close</v-icon></v-btn>
    </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  components: {},
  data() {
    return {
      
    };
  },
  methods: {}

};
</script>

<style scoped>
</style>
