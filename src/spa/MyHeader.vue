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
          <li class="li_button" v-if="isLogin"><a @click="login">내정보</a></li>
          <li class="li_button" v-else><a @click="login">로그인</a></li>
          <li class="li_button"><a href="#">로그아웃</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    mounted: function() {
      let token = this.getAccessToken();
      console.log(token)
      if(token == null || token == '') {
        //개인정보 요청
        console.log("token is null")
        this.isLogin = false;
      }
      else {
        console.log("token is not null")
        this.isLogin = true;
      }
    },
    data: function() {
      return {
        isLogin: false
      }
    },
    computed: {
      getToken () {
        return this.$store.getters.accessToken;
      }
    },
    methods: {
      getAccessToken: function () {
        this.$store.dispatch('readAccessToken');
        return this.getToken
      },
      login: function () {
        let token = this.getAccessToken();
        if(token == null || token == '') {
          this.$store.dispatch('issueAccessToken',{
            responseType: 'token',
            clientId: 'cli',
            username: 'jsmaster',
            password: '1234',
            redirectUri: 'http://localhost:8081/auth/callback',
            scope: 'member.info.public'
          });
        }
      },
      callback: function (success, msg) {
        if(success) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
          alert("로그인 실패!! 다시 로그인 해주세요.\n" + msg);
        }
      }
    }
  }
</script>

<style>
  .li_button :hover{
    cursor: pointer;
  }
</style>
