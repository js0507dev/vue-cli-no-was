<template>
  <div><a hrref="/">test</a></div>
</template>

<script>
export default {
  mounted: function() {
    let accessToken = this.getAccessToken();
    let tokenType = this.getAccessTokenType();
    let expire = this.getAccessTokenExpire();
    let tokenValue = tokenType + ' ' + accessToken;
    this.$store.dispatch('writeCookie', {
      name: 'access_token',
      value: tokenValue,
      expire: expire
    });
  },
  methods: {
    getParameterByName: function (name) {
      let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
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
