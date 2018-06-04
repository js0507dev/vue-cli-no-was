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
    mounted: function() {
      let token = this.getAccessToken();
      if(token != '') {
        //개인정보 요청
      }
    },
    computed: {
      accessToken () {
        return this.$store.getters.accessToken;
      }
    },
    methods: {
      getAccessToken: function () {
        this.$store.dispatch('readAccessToken', 'jsmaster');
        return this.accessToken;
      },
      login: function () {
        let token = this.getAccessToken();
        console.log("test == " + token + ", computed == " + (token == ''))
        alert("test");
        if(token == '' || token == undefined) {
          this.$store.dispatch('issueAccessToken',{
            responseType: 'implicit',
            clientId: 'cli',
            redirectUri: 'http://localhost:8081/auth/callback',
            scope: 'member.info.public'
          });
        }
      },
    }
  }
</script>

<style>
</style>
