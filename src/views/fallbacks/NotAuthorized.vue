<template>
  <v-container fluid fill-height>
    <v-layout align-content-center wrap>
      <v-flex xs12><v-icon color="warning">warning</v-icon></v-flex>
      <v-flex xs12><span class="display-4">401</span></v-flex>
      <v-flex xs12><span class="display-1">Unauthorized</span></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotAuthorized",
  components: {},
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style scoped>

.v-icon {
  font-size: 150px;
}

.display-4 {
  letter-spacing: 10px !important;
}

</style>
