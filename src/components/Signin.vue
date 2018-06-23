<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height class="form-container">
                <v-layout align-center justify-center>
                    <v-flex xs12 sm6 md3>
                        <section>
                            <section class="logo">
                                <img src="./../assets/icon.png" alt="" srcset="">
                                <h1>Safety PIN</h1>
                            </section>
                            <v-card class="login-form">
                                <v-form @keyup.enter.native="signin(email, password)">
                                    <v-text-field v-model="email" label="E-mail" required></v-text-field>
                                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                                    <v-btn color="info" flat @click="signin(email, password)">로그인</v-btn>
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
  export default {
    name: 'Signin',
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      checkForm(email, password) {
        return email && password;

      },
      signin(email, password) {
        if (!this.checkForm(email, password)) return false;
        this.signinMethod();
      },
      signinMethod() {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/account/t/login`, {
          email: this.email,
          password: this.password
        }).then((result) => this.signinSuccessed(result.data.message.session))
          .catch((err) => alert(err))
      },
      signinSuccessed(session) {
        this.$session.start();
        this.$session.set('session', session);
        this.$router.push('/')
      },
      getSession() {
        return this.$session.get('session');
      }
    },
    created() {
      if (this.$session.exists()) this.$router.push('/SignoutPlease');
      this.session = this.getSession()
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
        font-size: 0.8rem;
        text-decoration: none;
        color: #444444;
    }

    @media screen and (max-width: 420px) {

    }
</style>
