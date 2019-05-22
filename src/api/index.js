import Axios from 'axios';

export default Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'X-Parse-Application-Id': process.env.VUE_APP_PARSE_APPID,
    'X-Parse-JavaScript-Key': process.env.VUE_APP_PARSE_JAVASCRIPT_KEY
  }
})
