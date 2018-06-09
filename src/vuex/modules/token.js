import * as types from '../types'
import router from '../../config'

const state = {
  auth_server_url: 'http://localhost:8080',
  auth_endpoint: '/oauth/authorize',
  access_token: '',
  expire: null,
}

function initToken(state) {
  state.access_token = '';
  state.expire = null;
  localStorage.removeItem("token");
  localStorage.removeItem("expire");
}

const mutations = {
  [types.ISSUE_ACCESS_TOKEN] (state, payload) {
    const authEndpoint = state.auth_server_url + state.auth_endpoint;
    let params = "?response_type="+payload.responseType
      + "&client_id="+payload.clientId
      + "&username="+payload.username
      + "&password="+payload.password
      + "&redirect_uri="+payload.redirectUri
      + "&scope="+payload.scope;
    window.open(authEndpoint + params, "");
  },
  [types.READ_ACCESS_TOKEN] (state) {
    //let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    let token = localStorage.token;
    let expire = localStorage.expire;
    console.log("token = " + token + ", expire = " + expire);
    if(token == null || token == '') {
      console.log("token 초기화!! 1111111")
      initToken(state);
      return
    }

    let now = new Date();
    if(expire == null || now.getTime() > expire) {
      console.log("token 초기화!! 222222")
      initToken(state);
      return
    }

    state.access_token = token;
    state.expire = expire;
  },
  [types.WRITE_COOKIE] (state, payload) {
    let date = new Date();
    date.setSeconds(payload.expire);
    //document.cookie = payload.name + '=' + payload.value + ';expire=' + date.toUTCString() + ';path=/';
    localStorage.token = payload.value;
    localStorage.expire = date.getTime();

    state.access_token = localStorage.token;
    state.expire = localStorage.expire;
  },
}

export default {
  state,
  mutations
}
