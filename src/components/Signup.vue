<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="form-container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md5 lg3>
            <section>
              <a href="/" style="text-decoration: none">
                <section class="logo">
                  <img src="./../assets/icon.png" alt="" srcset="">
                  <h1>Safety PIN</h1>
                </section>
              </a>
              <v-card class="login-form">
                <v-form>
                  <v-text-field v-model="name" label="이름" required></v-text-field>
                  <v-text-field v-model="className" label="반" required maxlength="6"></v-text-field>
                  <v-text-field v-model="info" label="소개" required></v-text-field>
                  <v-text-field v-model="email" label="E-mail" type="email" required></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                  <v-btn color="info" flat @click="signup()">회원가입</v-btn>
                </v-form>
              </v-card>
            </section>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import api_request from '../js/api_request'

  export default {
    name: 'Signup',
    data() {
      return {
        email: '',
        password: '',
        name: '',
        className: '',
        info: ''
      }
    },
    methods: {
      signup() {
        if (this.email && this.password && this.name && this.className && this.info) api_request.signUp(this.email, this.password, this.name, this.className, this.info, result => {
          this.$session.start();
          this.$session.set('session', result.data.message.session);
          this.$session.set('name', result.data.message.name);
          this.$router.push('/');
        });
        else alert('정보를 모두 입력 해주세요.');
      },
    },
    created() {
      if (this.$session.exists()) this.$router.push('/');
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }

  html {
  }

  .form-container {
    background-color: #2682FF;
  }

  .logo {
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .logo img {
    width: 120px;
  }

  .logo h1 {
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    font-weight: 300;
  }

  .login-form {
    padding: 15px;
    background-color: #fff;
    color: #2682FF;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
