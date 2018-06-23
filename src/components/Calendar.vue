<template>
    <v-app>
        <section class="main-container">
            <nav class="nav-container">
                <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" stateless hide-overlay>
                    <v-toolbar flat class="transparent">
                        <v-list class="pa-0">
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>John Leider</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon @click.native.stop="mini = !mini">
                                        <v-icon>chevron_left</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
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
              <v-card>
                <p>
                  asd
                </p>
                <requestmentList />
              </v-card>
              <v-card>
               <FullCalendar :events="events" :selectable=false :config="config"></FullCalendar>
              </v-card>
            </section>
        </section>
    </v-app>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import requestmentList from '@/components/requestmentList.vue'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    requestmentList
  },
  data () {
    return {
      drawer: true,
      items: [
          { title: 'Home', icon: 'dashboard', to:'/' },
          { title: 'Chat', icon: 'question_answer', to:'/chat' },
          { title: 'Calendar', icon: 'date_range', to:'/calendar' }                
      ],
      right: null,
      mini: true,
      events: [
        {
          title  : '방진혁 부모님',
          start  : '2018-05-17T12:30:00',
          end : '2018-05-17T13:30:00',
          allDay : false,
        },
      ],
      config: {
        defaultView: 'month',
        locale: 'ko',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'today'
        },
      },
      session: null
    }
  },
  methods: {
    loadCalendar(session) {
      const baseURI = 'https://letscoding.kr:8888/api/v1'
      this.$http.get(`${baseURI}`, {
        params: {
          "session": this.session
        }
      })
      .then((result) => {
        this.events = result.data.calendar
      }) 
      .catch((err) => {
        alert(err)
      })
    },
    getSession () {
      return this.$session.get('session')
    },
  },
  created() {
    if (!this.$session.exists())
      this.$router.push('/SigninPlease')
    this.session = this.getSession()
    //this.loadCalendar(this.session)
    // setInterval(() => {
    //   this.loadRequestment()
    // }, 5000)
  }
}
</script>

<style scoped>
  @import '~fullcalendar/dist/fullcalendar.css';
  .main-container{
      width: 100%;
      min-height:100vh;
      display: flex;
      flex-direction: row;
  }
  .nav-container{
      height: 100vh;
      min-width: 6vw;
  }
  section {
    width: 50vw;
  }
</style>
