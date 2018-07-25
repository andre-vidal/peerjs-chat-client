<template>
  <v-container fluid >
    <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
      <v-list two-line>
        <v-subheader>Online Users</v-subheader>
        <template v-for="(item, index) in $store.state.users">
          <v-list-tile :key="index" avatar @click="openChat(index)">
            <v-list-tile-avatar>
              <img v-if="item.avatar" :src="item.avatar">
              <v-icon v-else>person</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.username }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="index+'divider'"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-container>
</template>

<script>
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
    openChat: function(item){
      console.log(item)
    }

  }
}
</script>

<style scoped>

.v-list {
  height: 80vh;
  overflow: auto;
}
</style>

