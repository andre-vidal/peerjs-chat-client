<template>
  <v-container fluid fill-height pa-0 ma-0>
    <v-layout fluid column  align-conten-end>
      <v-card height="100%">
        <v-list two-line>
          <v-subheader>Online Users</v-subheader>
          <template v-for="(item, index) in $store.state.users" v-if="index != $store.state.user.peerId">
            <v-list-tile :key="index" avatar>
              <!-- <v-badge color="cyan" >
                <span slot="badge">6</span> -->
                <v-list-tile-avatar color="grey">
                  <img v-if="item.avatar" :src="item.avatar">
                  <v-icon dark v-else>person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.username }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon color="accent" ripple dark @click="openChat(index)"><v-icon>message</v-icon></v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon color="accent" ripple dark @click="callPeer(index)"><v-icon>phone</v-icon></v-btn>
                </v-list-tile-action>
              <!-- </v-badge> -->
            </v-list-tile>
            <v-divider inset :key="index+'divider'"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import {bus} from '@/main'

export default {
  name: 'home',
  components: {},
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
    openChat: function(index){
      this.$store.dispatch('setOtherPeer', {
        peerId: index,
        avatar: this.$store.state.users[index].avatar,
        username: this.$store.state.users[index].username,
        subtitle: this.$store.state.users[index].subtitle,
      })
      bus.$emit('openChat', this.$store.state.otherPeer.peerId)
    },
    callPeer: function(index){
      this.$store.dispatch('setOtherPeer', {
        peerId: index,
        avatar: this.$store.state.users[index].avatar,
        username: this.$store.state.users[index].username,
        subtitle: this.$store.state.users[index].subtitle,
      })
      bus.$emit('callPeer')
    }

  }
}
</script>

<style scoped>

.v-list {
  overflow: auto;
}

.v-divider {
  /* margin-left: 20px; */
  margin-right: 10px;
}
</style>

