<template>
  <div><a hrref="/">test</a></div>
</template>

<script>
export default {
  mounted: function() {
    console.log("test ===== ")
    if( this.errorCheck() ) {
      this.$parent.$options.components.MyHeader.methods.callback(false, this.error_description);
      window.close();
    }

    let accessToken = this.getAccessToken();
    let tokenType = this.getAccessTokenType();
    let expire = this.getAccessTokenExpire();
    let tokenValue = tokenType + ' ' + accessToken;
    this.$store.dispatch('writeCookie', {
      name: 'access_token',
      value: tokenValue,
      expire: expire
    });

    this.$parent.$options.components.MyHeader.methods.callback(true, "");
    window.close();
  },
  data : function () {
    return {
      error: '',
      error_description: ''
    }
  },
  methods: {
    getParameterByName: function (name) {
      let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    errorCheck : function () {
      let error = this.getParameterByName('error');
      let description = this.getParameterByName('error_description');

      if(error == null || error == '')
        return false;

      this.error = error;
      this.error_description = description;

      return true;
    },
    getAccessToken: function () {
      return this.getParameterByName('access_token');
    },
    getAccessTokenType: function () {
      return this.getParameterByName('token_type');
    },
    getAccessTokenExpire: function () {
      return this.getParameterByName('expires_in');
    }
  }
}
</script>

<style>
</style>
