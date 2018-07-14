<template>
  <v-app>
    <section class="main-container">
      <sideMenu :name="name"></sideMenu>
      <section class="content" style="background-color:#2682FF;">
        <v-layout column="">
          <v-layout row justify-center style="padding-top:25px">
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
                      <v-btn @click="student_add()" icon>
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
  import Vue from 'vue';

  export default {
    name: 'Index',
    components: {sideMenu},
    data() {
      return {
        signed: this.$session.exists(),
        contacts: [],
        requests: [],
        name: this.$session.get('name'),
        session: this.$session.get('session'),
        st_name: '',
        st_num: ''
      }
    },
    methods: {
      student_add() {
        if (this.st_name && this.st_num) api_request.addStudent({
          session: this.session, name: this.st_name, number: this.st_num
        }, r => Vue.set(this.contacts, this.contacts.length, {
          name: this.st_name,
          code: r.message['code'],
          num: this.st_num
        }));
        else alert('학번과 이름을 모두 입력해주세요.');
      },
    },
    created() {
      if (!this.$session.exists()) this.$router.push('/signin');
      else {
        api_request.loadStudent({session: this.session}, r => r.message.forEach(v => this.contacts.push({
          name: v['st_name'],
          code: v['code'],
          num: v['st_num']
        })));
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

  .logo h1 {
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    font-weight: 300;
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

  .nav-container {
    height: 100vh;

  }
</style>