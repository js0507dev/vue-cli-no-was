<template>
  <nav class="navbar navbar-default">
    <div class="containerfluid">
      <div class="navbar-header">
        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle" />
        <router-link to="/" class="navbar-brand">JS Exchange</router-link>
      </div>
      <div id="navbar" class="navbar-collapse">
        <ul class="nav navbar-nav">
          <li><router-link to="/trade">거래</router-link></li>
          <li><router-link to="/quote">시세확인</router-link></li>
          <li><router-link to="/account">계좌관리</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="login">로그인</a></li>
          <li><router-link to="/logout">로그아웃</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data: function() {
      return {
        access_token: '',
      }
    },
    mounted: function() {
      this.getAccessToken();
    },
    methods: {
      getAccessToken: function () {
        console.log("tttt")
        return this.$event_bus.$emit('readAccessToken', (data) => {
          this.access_token = data;
          console.log("in a callback!!!");
          console.log("token :: " + data);
        });
      },
      login: function () {
        this.getAccessToken();
        if(this.access_token == '') {
          this.$event_bus.$emit('issuedAccessToken', {
            responseType: 'token',
            clientId: 'cli',
            redirectUri: 'http://localhost:8081/auth/callback',
            scope: 'read'
          });
        }
      }
    }
  }
</script>

<style>
</style>
