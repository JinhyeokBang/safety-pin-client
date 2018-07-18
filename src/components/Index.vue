<template>
  <v-app>
    <section class="main-container">
      <sideMenu :name="name"></sideMenu>
      <section class="content" style="background-color:#2682FF;">
        <v-layout column="">
          <v-layout row justify-center style="padding-top:25px">
            <v-flex sm10 lg6 v-if="!manager">
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
            <v-flex sm12 lg9 v-else>
              <v-card>
                <v-list subheader>
                  <v-subheader>PIN 관리</v-subheader>
                  <v-list-tile v-for="(contact, key) in events" :key="key" avatar>
                    <v-list-tile-avatar>
                      <v-icon>account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="`${contact.st_name}(${contact.st_num})${(contact.pin?`  PIN : ${contact.pin}(${new Date(contact.expires).toLocaleString()})`:'')}`"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="contact.accept !== 0">
                      <v-btn @click="delpin(contact.id, contact.pin)" icon>
                        <v-icon color="green">done</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card>
              <v-card>
                <v-list subheader>
                  <v-subheader>연락처</v-subheader>
                  <v-list-tile v-for="(contact, key) in contacts" :key="key" avatar>
                    <v-list-tile-avatar>
                      <v-icon>account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="`${contact.name}(${contact.num})  학생코드 : ${contact.code}  담당선생님 : ${contact.t_class} ${contact.t_name}(${contact.t_email})`"></v-list-tile-title>
                    </v-list-tile-content>
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
  import sideMenu from './SideMenu.vue';
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
        manager: this.$session.get('manager'),
        events: [],
        st_name: '',
        st_num: ''
      }
    },
    methods: {
      delpin(id, pin) {
        api_request.deletePinM({session: this.session, id, pin}, () => window.location.reload());
      },
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
        if (this.manager) {
          api_request.loadStudentM({session: this.$session.get('session')}, r => r.message.forEach(v => {
            this.contacts.push({
              name: v['st_name'],
              code: v['code'],
              num: v['st_num'],
              t_name: v['t_name'],
              t_email: v['t_email'],
              t_class: v['t_class'],
            })
          }));
          api_request.loadPin({session: this.session}, r => {
            this.events = r.message;
            const data = {};
            this.events.forEach(v => {
              if (Object.keys(v).includes('timestp')) {
                const date = new Date(v.timestp);
                date.setHours(date.getHours() + 9);
                data[v.id] = (date).toISOString().substring(0, 16);
              }
            });
            this.expires = data;
            console.log(this.expires);
          });
        }

        else api_request.loadStudent({session: this.$session.get('session')}, r => r.message.forEach(v => this.contacts.push({
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