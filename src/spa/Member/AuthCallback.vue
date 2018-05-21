<template>
  <div><a hrref="/">test</a></div>
</template>

<script>
export default {
  mounted: function() {
    console.log("AUthCallback!!")
    let accessToken = this.getAccessToken();
    let tokenType = this.getAccessTokenType();
    let expire = this.getAccessTokenExpire();
    let tokenValue = tokenType + ' ' + accessToken;
    this.$event_bus.$emit('writeCookie', 'access_token', tokenValue, expire);

    window.location.href = "/";
  },
  methods: {
    getParameterByName: function (name) {
      let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
      console.log("test[" + name + "] = " + (match && decodeURIComponent(match[1].replace(/\+/g, ' '))));
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    getAccessToken: function () {
      return this.getParameterByName('access_token');
    },
    getAccessTokenType: function () {
      return this.getParameterByName('token_type');
    },
    getAccessTokenExpire: function () {
      return this.getParameterByName('expire');
    }
  }
}
</script>

<style>
</style>
