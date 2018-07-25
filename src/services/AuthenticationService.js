// eslint-disable-next-line
import Api from '@/services/Api'

export default {
  login(credentials){
    try {
      // return Api().post('auth/login', credentials);
      return {
        data: {
          user: {
            username: credentials.username,
            peerId: credentials.peerId
          },
          token: "token"
        }
      }
    }catch(err){
      console.log(err)
    }
  },
  logout(credentials){
    try {
      throw "Test"
      // eslint-disable-next-line
      console.log(credentials)
      // return Api().post('auth/logout', credentials);
    }catch(err){
      console.log(err)
      return {}
    }
  }
}
