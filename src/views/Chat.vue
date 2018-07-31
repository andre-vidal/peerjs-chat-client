<template>
  <v-container fluid fill-height pa-0 ma-0>
    <v-layout fluid column >
      <v-card height="100%" color="transparent">
        <v-layout fill-height align-end row wrap>
          <v-flex>
            <v-subheader>Chatting with {{ $store.state.otherPeer.username }}</v-subheader>
              <template v-for="(item, index) in $store.state.currentConvo">
                <v-list-tile :key="index">
                  <v-list-tile-content>
                    <v-list-tile-title class="body-2" :class="{'text-xs-right':item.from==$store.state.user.peerId}">{{ item.msg }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            <v-card-actions>
              <v-flex xs10 pl-2>
                <v-text-field
                  v-model="msg"
                  type="text"
                  name="msg"
                  placeholder="Type message here..."
                ></v-text-field>
              </v-flex>
              <v-flex xs-2>
                <v-btn flat color="primary" @click="send()">Send</v-btn>
              </v-flex>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'chat',
  components: {},
  data() {
    return {
      msg: null
    }
  },
  mounted(){    
    this.$store.dispatch('openChat')
  },
  beforeDestroy(){
    this.$store.dispatch('closeChat')
  },
  methods: {
    send: function(){
      var msg = {
        from: this.$store.state.user.peerId,
        msg: this.msg,
        timestamp: null
      }
      this.$store.state.conns[this.$store.state.otherPeer.peerId].send(msg)
      // set chat identifier
      msg.chat = this.$store.state.otherPeer.peerId,
      // console.log(msg)
      this.$store.dispatch('pushMessage', msg)
      this.msg = null
    }
  }
}
</script>

<style scoped>

.v-card {
  overflow: auto;
}
</style>

