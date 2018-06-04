import * as types from '../types'

const state = {
  auth_server_url: 'http://localhost:8080',
  auth_endpoint: '/oauth/authorize',
  access_token: ''
}

const mutations = {
  [types.ISSUE_ACCESS_TOKEN] (state, payload) {
    const authEndpoint = state.auth_server_url + state.auth_endpoint;
    let params = "?response_type="+payload.responseType
      + "&client_id="+payload.clientId
      + "&redirect_uri="+payload.redirectUri
      + "&scope="+payload.scope;
    window.location.href = authEndpoint + params;
  },
  [types.READ_ACCESS_TOKEN] (state, name) {
    //let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    let userinfo = sessionStorage.getItem(name);
    if(userinfo == null || userinfo == undefined) {
      sessionStorage.removeItem(name);
    }

    let now = new Date();
    if(now.toUTCString() < userinfo.expire) {
      sessionStorage.removeItem(name);
    }

    userinfo = sessionStorage.getItem(name);
    state.access_token = userinfo.value;
  },
  [types.WRITE_COOKIE] (state, payload) {
    let date = new Date();
    date.setSeconds(payload.expire);
    //document.cookie = payload.name + '=' + payload.value + ';expire=' + date.toUTCString() + ';path=/';
    sessionStorage.setItem('jsmaster', {
      name: payload.name,
      value: payload.value,
      expire: date.toUTCString()
    });
  },
}

export default {
  state,
  mutations
}
