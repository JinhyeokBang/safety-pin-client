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
                  <v-subheader>회원 목록</v-subheader>
                  <v-list-tile v-for="(ac, key) in accounts" :key="key" avatar>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="`<span style='font-weight: 900;'>${ac.level===1?'학부모':ac.level===100?'교사':'보안 관리자'}</span> : ${ac.email}(이름 : ${ac.name})`"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
              <v-card>
                <v-list subheader>
                  <v-subheader>로그 관리</v-subheader>
                  <v-list-tile v-for="(log, key) in logs" :key="key" avatar>
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="`${new Date(log.timestp).toLocaleString()}에 ${replaceMessage(log.message.split('from ')[0])+'이 발생하였습니다. IP 주소는 '+log.message.split('from ')[1]}`"></v-list-tile-title>
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
    name: 'Manage',
    components: {sideMenu},
    data() {
      return {
        accounts: [],
        name: this.$session.get('name'),
        session: this.$session.get('session'),
        manager: this.$session.get('manager'),
        logs: [],
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
      replaceMessage(message) {
        const bold = `<span style="font-weight: 900;">`;
        const end = `</span>`;
        const replace = [['Login', '로그인'], ['Register', '회원가입'], ['My_pin', 'PIN 조회'], ['Child_Add', '자녀 등록'], ['Delete_Pin', 'PIN 제거'], ['Load_chat', '채팅 로드'], ['Load_calender', '요청 조회'], ['Delete_pin', 'PIN 제거']];
        replace.forEach(v => message = message.replace(v[0], bold + v[1] + end));
        return message.replace('Request ', '요청').replace('Failed', '실패한');
      }
    },
    created() {
      if (!this.$session.exists() || !this.manager) this.$router.push('/signin');
      else {
        if (this.manager) {
          api_request.loadLogs({session: this.$session.get('session')}, r => r.message.forEach(v => this.logs.push(v)));
          api_request.loadAccounts({session: this.$session.get('session')}, r => {
            console.log(r.message);
            r.message.forEach(v => this.accounts.push(v));
          });
        }
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

  .logo img {
    width: 120px;
  }
</style>