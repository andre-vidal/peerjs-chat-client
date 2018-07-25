<template>
    <v-container fluid fill-height>
      <v-layout align-content-space-around justify-center column fill-height> 
        <v-card>
          <v-flex xs12 mt-4 mb-4>
            <span class="display-1">Log In</span>
          </v-flex>
          <v-flex xs12 pl-4 pr-4>
            <v-text-field
              v-model="credentials.username"
              type="text"
              name="username"
              label="Username"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 pl-4 pr-4>
            <v-text-field
              v-model="$store.state.user.peerId"
              type="text"
              name="peerId"
              label="PeerID"
              readonly
            ></v-text-field>
          </v-flex>
          <v-flex xs12 pl-4 pr-4 mb-4>
            <v-btn class="btn-submit" block color="primary" :disabled="!credentials.username || !$store.state.user.peerId" v-on:click="login()">Continue</v-btn>
          </v-flex>
        </v-card>               
      </v-layout>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: "Login",
  components: {},
  data() {
    return {
      credentials: {
        username: null,
        peerId: null,
      }
    };
  },
  methods: {    
    async login(){
      try{
        this.credentials.peerId = this.$store.state.user.peerId
        const response = await AuthenticationService.login(this.credentials)

        // console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        // eslint-disable-next-line
        firebase.database().ref('users/' + this.credentials.peerId).set({
          username: this.credentials.username,
          avatar : null,
          subtitle: "Hey, i'm using P2P Chat"
        });

        // this.$session.start()
        // this.$session.set('jwt', response.data.token)
        // this.$session.set('user', response.data.user)
        this.$router.push({name: 'home'})
        this.$store.dispatch('setSnackbar', {show: true, text: "Logged in as '"+this.$store.state.user.username+"'", color: "success", x:'right', timeout: 3000})
      }catch(err){
        console.log(err.response.data.error)
        this.$store.dispatch('setSnackbar', {show: true, text: "Log in error occured", color: "error", x:'right', timeout: 3000})
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.title {
  margin-bottom: 40px;
}

.forgot-pass {
  margin-top: 20px;
  text-decoration: underline;
  margin-bottom: 40px;
}
</style>
