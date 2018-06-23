<template>
    <v-app>
        <section class="main-container">
            <nav class="nav-container">
                <v-navigation-drawer :mini-variant.sync="open" v-model="drawer" stateless hide-overlay>
                    <v-toolbar flat class="transparent">
                        <v-list class="pa-0">
                            <v-list-tile avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{name}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>
                    <v-list class="pt-0" dense>
                        <v-divider></v-divider>
                        <v-list-tile v-for="item in items" :key="item.title">
                            <v-list-tile-action>
                                <v-btn :to="item.to" icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-spacer></v-spacer>
                </v-navigation-drawer>
            </nav>

            <section class="content">
                <v-layout column="">
                    <v-jumbotron color="grey lighten-2" v-if="!isLogin">
                        <v-container fill-height>
                            <v-layout align-center>
                                <v-flex>
                                    <h3 class="display-3">Safety Pin <span class="subheading">학교를 위한 보안 솔루션</span></h3>
                                    <span class="subheading">사이트 이용을 위해 로그인을 해주세요. </span>
                                    <v-btn large color="primary" class="mx-0" to="/signin">Login</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-jumbotron>
                    <v-layout row justify-center v-if="isLogin">
                        <v-flex sm10 lg6>
                            <v-card>
                                <v-list subheader>
                                    <v-subheader>연락처</v-subheader>
                                    <v-list-tile v-for="(contact, key) in contacts" :key="key" avatar>
                                        <v-list-tile-avatar>
                                            <v-icon>account_circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="contact.name + '(' + contact.num+')'"></v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-btn v-bind:to="'chat/'+ contact.code" icon>
                                                <v-icon color="primary">chat_bubble</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-layout>

            </section>
        </section>
    </v-app>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        signed: this.$session.exists(),
        drawer: true,
        items: [
          {title: 'Home', icon: 'dashboard', to: '/'},
          {title: 'Chat', icon: 'question_answer', to: '/chat'},
          {title: 'Calendar', icon: 'date_range', to: '/calendar'},
          {title: 'Logout', icon: 'door-open', to: '/calendar'}
        ],
        contacts: [],
        requests: [],
        right: null,
        mini: true,
        isLogin: false,
        name: this.$session.get('name'),
      }
    },
    methods: {
      signout() {
        this.$session.destroy();
        this.signed = this.$session.exists();
        location.reload();
      }
    },
    created() {
      if (this.$session.exists()) {
        this.isLogin = true;
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/account/t/load`, {
          session: this.$session.get('session')
        }).then((result) => {
          console.log(result);
          result.data.message.forEach(v => {
            this.contacts.push({
              name: v['st_name'],
              code: v['code'],
              num: v['st_num']
            })

          });
        })
          .catch((err) => alert(err))
      }
    }
  }
</script>

<style scoped>
    .main-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: row;
    }

    .nav-container {
        height: 100vh;

    }
</style>