<template>
  <v-toolbar color="primary" app dark flat fixed clipped-left>
    <v-toolbar-title>P2P Chat</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-if="$store.state.loggedIn" offset-y>
      <v-btn slot="activator" icon dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list class="pa-0 text-xs-right">
        <v-list-tile >
          <v-btn class="ma-0 pl-2 pr-2 error--text text-xs-right" flat @click="logout()">
            <strong>Log Out</strong>
            <v-icon class="ml-2">exit_to_app</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-flex xs12 slot="extension" class="ext" layout row wrap align-center v-if="$store.state.inChat" >
      <!-- <v-card color="warning" dense dark flat pa-0 fluid> -->
        <v-btn icon @click="$router.push({name: 'home'})">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-flex>
          <p class="headline text-xs-left ma-0">{{ $store.state.otherPeer.username }}</p>
        </v-flex>
      <!-- </v-card> -->
    </v-flex>
  </v-toolbar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: "Header",
  methods: {
    navigate: function(to){
      this.$router.push(to)
    },
    async logout(){
      try{
        const response = await AuthenticationService.logout({userId: this.$store.state.user.username})
        // console.log(response.data)
        if(response){
          // eslint-disable-next-line
          firebase.database().ref('users/' + this.$store.state.user.peerId).remove();
          // this.$session.destroy()
          this.$store.dispatch('logout')
          this.$router.push({name: 'login'})
          this.$store.dispatch('setSnackbar', {show: true, text: "Logged out successfully", color: "success", x:'right', timeout: 3000})
        }
      }catch(err){
        console.log(err.response.data.error)
        this.$store.dispatch('setSnackbar', {show: true, text: "Log out error occured", color: "error", x:'right', timeout: 3000})
      }
    }
  }

};
</script>

<style scoped>
.v-btn {
  text-transform: capitalize;
}

.v-toolbar__extension{
  padding: 0px !important;
}
.ext {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  background: black;
}
</style>
