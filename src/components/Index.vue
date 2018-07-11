<template>
    <v-app>
        <section class="main-container">
            <sideMenu :name="name" :items="items"></sideMenu>
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
                    <v-layout row justify-center v-if="isLogin" style="padding-top:25px">
                        <v-flex sm10 lg6>
                            <v-card>
                                <v-list subheader>
                                    <v-subheader>연락처</v-subheader>
                                    <v-list-tile v-for="(contact, key) in contacts" :key="key" avatar>
                                        <v-list-tile-avatar>
                                            <v-icon>account_circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title
                                                    v-html="`${contact.name}(${contact.num})  학생코드 : ${contact.code}`"></v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-btn v-bind:to="'chat/'+ contact.code" icon>
                                                <v-icon color="primary">chat_bubble</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content style="width:33%">
                                            <v-text-field v-model="st_name" type="text" placeholder="추가하실 학생의 이름">
                                            </v-text-field>
                                        </v-list-tile-content>
                                        <v-list-tile-content>
                                            <v-text-field v-model="st_num" type="text" placeholder="추가하실 학생의 학번">
                                            </v-text-field>
                                        </v-list-tile-content>
                                        <v-list-tile-action style="%" icon>
                                            <v-btn @click="student_add(st_name, st_num)" icon>
                                                <v-icon color="green">person_add</v-icon>
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
  import api_request from "../js/api_request";
  import sideMenu from './SideMenu';

  export default {
    name: 'Index',
    components: {
      sideMenu: sideMenu
    },
    data() {
      return {
        signed: this.$session.exists(),
        drawer: true,
        items: [
          {title: 'Home', icon: 'dashboard', to: '/'},
          {title: 'Calendar', icon: 'date_range', to: '/calendar'}
        ],
        contacts: [],
        requests: [],
        right: null,
        mini: true,
        isLogin: false,
        name: this.$session.get('name'),
        session: this.$session.get('session'),
        st_name: '',
        st_num: ''
      }
    },
    methods: {
      student_add(name, number) {
        api_request.addStudent({session: this.$session.get('session'), name: name, number: number}, () => window.location.reload());
      },
    },
    created() {
      if (this.$session.exists()) {
        this.isLogin = true;
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/account/t/load`, {
          session: this.$session.get('session')
        }).then((result) => result.data.message.forEach(v => {
          this.contacts.push({
            name: v['st_name'],
            code: v['code'],
            num: v['st_num']
          })
        })).catch((err) => alert(err));
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
        overflow: hidden;
    }

    .nav-container {
        height: 100vh;

    }
</style>