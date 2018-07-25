<template>
  <v-toolbar color="primary" app dark flat fixed clipped-left>
    <v-toolbar-title>[Project Name]</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-if="$store.state.loggedIn" offset-y>
      <v-btn slot="activator" icon dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list class="pa-0 text-xs-right">
        <v-list-tile >
          <v-btn class="ma-0 pl-2 pr-2 info--text text-xs-right" flat>
            <strong>Help</strong>
            <v-icon class="ml-2">help</v-icon>
          </v-btn>
        </v-list-tile>
        <v-list-tile >
          <v-btn class="ma-0 pl-2 pr-2 accent--text text-xs-right" flat @click="logout()">
            <strong>Log Out</strong>
            <v-icon class="ml-2">exit_to_app</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
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
          // this.$session.destroy()
          this.$router.push({name: 'login'})
          this.$store.dispatch('setSnackbar', {show: true, text: "Logged out successfully", color: "success", x:'right', timeout: 3000})
          this.$store.dispatch('logout')
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
</style>
