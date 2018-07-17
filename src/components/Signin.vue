<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="form-container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md3>
            <section>
              <section class="logo">
                <img src="./../assets/icon.png" alt="" srcset="">
                <h1>SafetyPIN</h1>
              </section>
              <v-card class="login-form">
                <v-form @keyup.enter.native="signin()">
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                  <v-layout align-center justify-center>
                    <v-flex>
                      <v-btn color="info" flat @click="signin(true)">로그인</v-btn>
                      <v-btn color="error" @click="signin(false)">보안 관리자로 로그인</v-btn>
                    </v-flex>
                  </v-layout>
                  <a href="#/signup" class="signup-link">계정이 없으신가요?</a>
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
    name: 'Signin',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      signin(isManager) {
        if (this.email && this.password) {
          if (isManager) {
            api_request.signIn(this.email, this.password, result => {
              this.$session.start();
              this.$session.set('session', result.message.session);
              this.$session.set('name', result.message.name);
              this.$session.set('manager', false);
              this.$router.push('/')
            });
          } else {
            api_request.signInM(this.email, this.password, result => {
              this.$session.start();
              this.$session.set('session', result.message.session);
              this.$session.set('name', result.message.name);
              this.$session.set('manager', true);
              this.$router.push('/')
            });
          }
        } else {
          alert('정보를 모두 입력 해주세요.');
        }
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
    height: 250px !important;
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
  .signup-link {
    margin-top: 10px;
    font-size: 0.8rem;
    text-decoration: none;
    color: #444444;
  }
  @media screen and (max-width: 420px) {

  }
</style>
