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
                    v-html="`${contact.name}(${contact.num})${(contact.pin?`  PIN : ${contact.pin}(${new Date(contact.expires).toLocaleString()})`:' 만남 요청 일자 : '+ new Date(contact.timestp).toLocaleDateString())}`"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="contact.accept === 0">
                  <v-btn @click="accept(contact.id, contact.expires)" icon>
                    <v-icon color="green">done</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept === 0">
                  <v-btn @click="ignore(contact.id)" icon>
                    <v-icon color="red">clear</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-text-field v-model="expires[contact.id]" type="datetime-local" style="padding: 0;">
                  </v-text-field>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-btn @click="edit(contact.id, contact.pin)" icon>
                    <v-icon color="green">edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
                  <v-btn @click="delpin(contact.id, contact.pin)" icon>
                    <v-icon color="red">clear</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="contact.accept !== 0">
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
        expires: {}
      }
    },
    methods: {
      loadCalendar() {
        api_request.loadCalendar({session: this.session}, r => {
          this.events = r.message;
          const data = {};
          this.events.forEach(v => {
            if (Object.keys(v).includes('timestp')) {
              const date =new Date(v.timestp);
              date.setHours(date.getHours() + 9);
              data[v.id] = (date).toISOString().substring(0, 16);
            }
          });
          this.expires = data;
          console.log(this.expires);
        });
      },
      ignore(id) {
        api_request.ignore({session: this.session, id}, () => window.location.reload());
      },
      delpin(id, pin) {
        api_request.deletePin({session: this.session, id, pin}, () => window.location.reload());
      },
      edit(pin, expires) {
        api_request.editPin({session: this.session, pin, expires: expires[id].toLocaleString()}, () => window.location.reload());
      },
      accept(id, expires) {
        api_request.acceptPin({session: this.session, id}, () => api_request.createPin({
          session: this.session, id, expires
        }, () => window.location.reload()));
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
