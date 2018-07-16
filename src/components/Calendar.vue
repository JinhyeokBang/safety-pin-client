<template>
  <v-app>
    <section class="main-container">
      <sideMenu :name="name"></sideMenu>
      <v-layout row justify-center style="padding-top:25px;background-color:#2682FF;">
        <v-flex sm12 lg9>
          <v-card>
            <v-list subheader>
              <v-subheader>요청 목록 및 PIN 관리</v-subheader>
              <v-list-tile v-for="(contact, key) in events" :key="key" avatar>
                <v-list-tile-avatar>
                  <v-icon>account_circle</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="`${contact.name}(${contact.num})${(contact.pin?`  PIN : ${contact.pin}(${new Date(contact.expires).toLocaleString()})`:'')}`"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="contact.accept === 0">
                  <v-btn @click="accept(contact.id)" icon>
                    <v-icon color="green">done</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept === 0">
                  <v-btn @click="ignore(contact.id)" icon>
                    <v-icon color="red">clear</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-text-field v-model="expires" type="datetime-local">
                  </v-text-field>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-btn @click="edit(contact.id, contact.pin, expires)" icon>
                    <v-icon color="green">edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-btn @click="delpin(contact.id, contact.pin)" icon>
                    <v-icon color="red">clear</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn v-bind:to="'chat/'+ contact.id" icon>
                    <v-icon color="primary">chat_bubble</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </section>
  </v-app>
</template>

<script>
  import {FullCalendar} from 'vue-full-calendar';
  import requestmentList from './requestmentList.vue';
  import sideMenu from './SideMenu.vue';
  import api_request from '../js/api_request';

  export default {
    name: 'Calendar',
    components: {
      FullCalendar,
      requestmentList,
      sideMenu
    },
    data() {
      return {
        right: null,
        events: [],
        session: this.$session.get('session'),
        name: this.$session.get('name'),
        expires: null
      }
    },
    methods: {
      loadCalendar() {
        api_request.loadCalendar({session: this.session}, r => this.events = r.message);
      },
      ignore(id) {
        api_request.ignore({session: this.session, id}, () => window.location.reload());
      },
      delpin(id, pin) {
        api_request.deletePin({session: this.session, id, pin}, () => window.location.reload());
      },
      edit(id, pin, expires) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/pin/edit/${pin}`, {
          "session": this.$session.get('session'),
          expires: expires.toLocaleString()
        })
          .then(() => {
            window.location.reload()
          })
          .catch((err) => {
            alert(err)
          })
      },
      accept(id) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/pin/accept`, {
          "session": this.$session.get('session'),
          "id": id
        }).then(() => {
          const baseURI = 'https://letscoding.kr:8888/api/v1';
          this.$http.post(`${baseURI}/pin/create`, {
            "session": this.$session.get('session'),
            "id": id
          })
            .then((result) => {
              const list = this.events;
              Object.keys(this.events).forEach(v => {
                if (this.events[v].id === id) {
                  list[v].pin = result.pin;
                  list[v].expries = result.expires;
                }
                this.events = list;
              });
              window.location.reload()
            })
            .catch((err) => {
              alert(err)
            })
        }).catch((err) => {
          alert(err)
        })
      },

    },
    created() {
      if (!this.$session.exists()) this.$router.push('/signin');
      else this.loadCalendar();
      //  setInterval(() => this.loadCalendar(), 5000);
    }
  }
</script>

<style scoped>
  @import '~fullcalendar/dist/fullcalendar.css';

  .main-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
  }

  .nav-container {
    height: 100vh;
    min-width: 6vw;
  }

  section {
    width: 50vw;
  }
</style>
