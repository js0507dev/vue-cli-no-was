<template>
</template>

<script>
  export default {
    name: "token",
    data: function() {
      return {
        auth_server_url: 'http://localhost:8080',
        auth_endpoint: '/oauth/authorize',
        cookie_name: 'jsExchange/AccessToken',
      }
    },
    created() {
      this.$event_bus.$on('readAccessToken', this.readAccessToken);
      this.$event_bus.$on('writeCookie', this.writeCookie);
      this.$event_bus.$on('issuedAccessToken', this.issuedAccessToken);
    },
    methods: {
      readCookie: function (name, callback) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        callback(value ? value[2] : '');
      },
      readAccessToken: function (callback) {
        return this.readCookie('access_token', callback);
      },
      writeCookie: function (name, value, expire) {
        let date = new Date();
        date.setSeconds(expire);
        document.cookie = name + '=' + value + ';expire=' + date.toUTCString() + ';path=/';
        console.log('TEST :: ' + date.toUTCString() + ", token :: " + name + "[" + value + "]")
      },
      issuedAccessToken: function (payload) {
        const authEndpoint = this.auth_server_url + this.auth_endpoint;
        console.log("GO!");
        let params = "?response_type="+payload.responseType
          + "&client_id="+payload.clientId
          + "&redirect_uri="+payload.redirectUri
          + "&scope="+payload.scope;
        window.location.href = authEndpoint + params;
      }
    }
  }
</script>

<style scoped>
</style>
