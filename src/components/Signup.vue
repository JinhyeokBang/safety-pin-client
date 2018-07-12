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
                                <!-- <input type="email" v-model="email" id="signinEmail" placeholder="아이디"/> -->
                                <!-- <input type="password" v-model="password" id="signinPassword" placeholder="비밀번호"/> -->
                                <v-form>
                                    <v-btn color="primary" flat @click="backButtonClicked()">뒤로가기</v-btn>
                                    <v-text-field v-model="name" label="이름" required></v-text-field>
                                    <v-text-field v-model="classNumber" label="반" required></v-text-field>
                                    <v-text-field v-model="info" label="소개" required></v-text-field>
                                    <v-text-field v-model="email" label="E-mail" required></v-text-field>
                                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                                    <v-btn color="info" flat @click="signup(email, password, classNumber, info)">회원가입</v-btn>
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
    name: 'Signup',
    data() {
      return {
        email: "",
        password: "",
        name: "",
        classNumber: "",
        info: ""
      }
    },
    methods: {
      checkForm(email, password) {
        return email && password;

      },
      signup(email, password, classNumber, info) {
        if (!this.checkForm(email, password)) return false;
        this.signupSuccessed(this.session, email, password, classNumber, info)
      },
      signupSuccessed(session) {
        this.$session.start();
        this.$session.set('session', session);
        this.$router.push('/');
      },
      backButtonClicked: () => this.$router.push('/'),
      signupMethod(session, email, password, classNumber, info) {
        const baseURI = 'https://letscoding.kr:8888/api/v1'
        this.$http.post(`${baseURI}/account/t/register`, {
          session: this.session,
          email: this.email,
          password: this.password,
          class: this.classNumber,
          info: this.info
        })
          .then((result) => {
            signupSuccessed(result.data.message.session)
          })
          .catch((err) => {

          })
      },
      getSession() {
        return this.$session.get('session')
      }
    },
    created() {
      if (this.$session.exists())
        this.$router.push('/');
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
