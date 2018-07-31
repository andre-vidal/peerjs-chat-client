<template>
  <v-app id="app">
    <Header />
    <!-- <SideNavigation /> -->
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
    <Footer />
    <Snackbar />
  </v-app>
</template>

<script>
import router from '@/router'
import {bus} from '@/main'

import Header from "./components/Header"
import Footer from "./components/Footer"
import Snackbar from "./components/Snackbar"

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Snackbar
  },
  mounted(){    

    // eslint-disable-next-line
    var peer = new Peer({config:{
      'iceServers': [
        { url: 'stun:stun1.1.google.com:19302' },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com '
        }
      ]
    }}); 

    peer.on('error', (err) => {
      console.log(err)
      this.$store.dispatch('setSnackbar', {show: true, text: "[PeerJS] error occured", color: "warning", x:'right', timeout: 3000})
    });
    
    peer.on('open', (id) => {
      this.$store.state.user.peerId = id
    });

    peer.on('close', () =>{
      // eslint-disable-next-line
      firebase.database().ref('users/' + this.$store.state.user.peerId).remove();
    })

    peer.on('connection',(conn) => { 
      
      conn.on('open', () => { 
        // Receive messages
        conn.on('data', (data) => {
          // set chat identifier
          data.chat = data.from,
          // console.log(data)
          this.$store.dispatch('pushMessage', data)
        }); 

        this.$store.dispatch('setConn', {chat: conn.peer, conn: conn})
      })

    })

    peer.on('call', (call) => {

      call.on('stream', (stream) => {
        console.log("Stream recieved from caller: ", stream)
        this.$store.dispatch('setOtherVideoStream', stream)
      });

      var constraints = { audio: true, video: true };
      navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {        
        console.log("Got navigator media stream")
        this.$store.dispatch('setMyVideoStream', mediaStream)
        this.$router.push({name: 'call'})
        // Answer the call, providing our mediaStream
        call.answer(mediaStream);
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

    });

    bus.$on('openChat', (data) => {
      
      if(this.$store.state.conns[data]){
        // avoid creating multiple connections for same peers
        this.$router.push({name: 'chat'}) 
      }else{        
        var conn = peer.connect(data);
  
        conn.on('open', () => {         
          this.$router.push({name: 'chat'})   
  
          // Receive messages
          conn.on('data', (data) => {
            // set chat identifier
            data.chat = data.from,
            console.log(data)
            this.$store.dispatch('pushMessage', data)
          }); 
  
          this.$store.dispatch('setConn', {chat: data, conn: conn})
        })
      }

      this.$store.dispatch('setCurrentConvo')
    })

    bus.$on('callPeer', () => {
      var constraints = { audio: true, video: true }
      var options = {
        'constraints': {
          'mandatory': {
              'OfferToReceiveAudio': true,
              'OfferToReceiveVideo': true
          }
        }
      }

      navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        //store my media stream
        console.log("Got navigator media stream")
        this.$store.dispatch('setMyVideoStream', mediaStream)        
        var call = peer.call(this.$store.state.otherPeer.peerId, mediaStream, options)
        
        call.on('stream', (stream) => {
          console.log("Stream recieved from other: ", stream)
          this.$store.dispatch('setOtherVideoStream', stream)
          this.$router.push({name: 'call'})
        });
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
    })
    
  },
  created(){
    // global navigation guards
    router.beforeEach((to, from, next) => {
      // check if user logged in
      if(this.$store.state.loggedIn){
        // attempting to reach an authentication route then redirect to dashboard
        if(to.name == 'login'){
          console.log("[router] already logged in")
          next({name: 'home'})
        }else{
          // attempting to reach route that user is authorized to access
          if(!to.meta.roles || to.meta.roles.includes(this.$store.state.user.role)){
            // proceed to requested page
            next()
          }else{
            next({name: 'notAuthorized'})
          }
        }
      // if user not logged in
      }else{
        // check if this route requires authentication and redirect to fallback
        if(to.matched.some(record => record.meta.requiresAuth)){
          console.log("[router] not unauthenticated, log in to access that page")
          next({name: 'notAuthenticated'})
        }else{
          // proceed to requested page
          next()
        }
      }
    })
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-content {
  background: url('./assets/background.jpg');
  background-size: cover;
  background-position: center center;
}

.btn-submit {
  height: 54px;
  text-transform: capitalize;
}
</style>
