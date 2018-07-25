import axios from 'axios'
import store from '@/store'

export default () => {
  return axios.create({
    baseURL: 'http://192.168.100.67:4000/',
    headers: {'Authorization': 'Bearer '+ store.state.token},
    // timeout: 3000
  })
}
