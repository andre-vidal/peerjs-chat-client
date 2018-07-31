<template>
  <v-container fluid fill-height pa-0 ma-0>
    <v-layout fluid row wrap align-conten-end>
      <v-flex xs12 sm6>
        <video id="myVideo"></video>
      </v-flex>
      <v-flex xs12 sm6>
        <video id="otherVideo"></video>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'home',
  components: {},
  mounted(){

    setTimeout(() => { 
      var video = document.querySelector('#myVideo');
      video.srcObject = this.$store.state.myVideoStream;
      video.onloadedmetadata = (e) => {
        video.play()
      }

      var video2 = document.querySelector('#otherVideo');
      video2.srcObject = this.$store.state.otherVideoStream;
      video2.onloadedmetadata = (e) => {
        video2.play()
      }
    }, 1000)
  },
  methods:{

  }
}
</script>

<style scoped>

#myVideo {
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 200px;
}

#otherVideo {
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 200px;
}
</style>

