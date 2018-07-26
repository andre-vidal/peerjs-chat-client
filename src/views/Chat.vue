<template>
  <v-container fluid>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card>
        <v-list one-line>
          <v-subheader>Chatting with {{ $store.state.otherPeer.username }}</v-subheader>
          <template v-for="(item, index) in convo">
            <v-list-tile :key="index" avatar @click="openChat(index)">
              <v-list-tile-avatar v-if="item.from == 'you'">
                <img v-if="$store.state.otherPeer.avatar" :src="$store.state.otherPeer.avatar">
                <v-icon v-else>person</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title :class="{'text-xs-right':item.from=='me'}">{{ item.msg }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar v-if="item.from == 'me'">
                <img v-if="$store.state.user.avatar" :src="$store.state.user.avatar">
                <v-icon v-else>person</v-icon>
              </v-list-tile-avatar>

            </v-list-tile>
          </template>
        </v-list>
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
            <v-btn flat color="primary">Send</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'chat',
  components: {},
  data() {
    return {
      msg: null,
      convo: {
        1: {from: "me", msg: "Hello", timestamp: "5:30pm"},
        2: {from: "you", msg: "Hey", timestamp: "5:32pm"},
        3: {from: "me", msg: "What's up", timestamp: "5:34pm"},
      }
    }
  },
  mounted(){
    this.getUsers()
  },
  methods:{
    getUsers: function(){
      try{
        // eslint-disable-next-line
        firebase.database().ref('users').on('value', (snapshot) => {
          // console.log(snapshot.val())
          this.$store.state.users = snapshot.val()
        })       
      } catch(err){
        console.log(err)
      }
    },
    openChat: function(item){
      console.log(item)
    }

  }
}
</script>

<style scoped>

.v-list {
  max-height: 70vh;
  overflow: auto;
}
</style>

