<template>
    <v-app>
        <section class="main-container">
            <nav class="nav-container">
                <v-navigation-drawer v-model="drawer" stateless>
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
                        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
                            <v-list-tile-action>
                                <v-btn icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="signout">
                            <v-list-tile-action>
                                <v-btn icon>
                                    <v-icon>lock_open</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Logout</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-spacer></v-spacer>
                </v-navigation-drawer>
            </nav>
            <section class="content layout row justify-center">
                <v-list id="chatContent" style="min-width: 50%">
                    <div class="chat-container">
                        <v-list-tile v-for="item in chatMessages" :key="item.timestp" avatar>
                            <v-list-tile-avatar>
                                <v-icon>account_circle</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.direction === 0?item.name:'나'"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.chat"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </div>
                    <v-card flat style="padding:10px;">
                        <v-form @keyup.enter.native="sendChatMessageMethod(chat)">
                            <v-text-field v-model="chat"></v-text-field>
                            <v-btn flat color="blue" @click="sendChatMessageMethod(chat)">보내기</v-btn>
                        </v-form>
                    </v-card>
                </v-list>

            </section>
        </section>
    </v-app>
</template>

<script>
  import Chat from '@/components/Chat'

  export default {
    name: "ChatList",
    components: {
      Chat
    },
    methods: {
      getSession() {
        return this.$session.get('session')
      },
      loadChatMessageMethod() {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/chat/t/load/`, {
          session: this.session,
          id: this.$route.params.child_id
        }).then((result) => this.loadChatSuccessed(result.data.message.chat))
          .catch((err) => alert(err))
      },
      loadChatSuccessed(chat) {
        this.chatMessages = chat
      },
      sendChatMessageMethod(chat) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/chat/t/send`, {session: this.session, id: this.$route.params.child_id, chat: chat})
          .then(() => this.loadChatMessageMethod())
          .catch((err) => alert(err));
        this.chat = "";
      },
      signout() {
        this.$session.destroy();
        location.reload();
      }
    },
    data() {
      return {
        drawer: true,
        items: [
          {title: 'Home', icon: 'dashboard', to: '/'},
          {title: 'Calendar', icon: 'date_range', to: '/calendar'}
        ],
        chatMessages: [],
        right: null,
        mini: true,
        name: this.$session.get('name'),
        chat: ''
      }
    },
    created() {
      if (!this.$session.exists())
        this.$router.push('/SigninPlease');
      this.session = this.getSession();
      this.loadChatMessageMethod(this.session);
      setInterval(() => this.loadChatMessageMethod(), 5000);
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

    .chat-container {
        height: 90%;
        overflow-y: scroll;
    }

    .nav-container {
        height: 100vh;
        min-width: 6vw;
    }

    .calendar {
        float: left;
    }

    #chatContent {
        height: 90vh;
    }

    .chat-container::-webkit-scrollbar {
        width: 10px;
        background-color: #628994;
    }

    .chat-container::-webkit-scrollbar-thumb {
        background-color: #628994;
    }

    .chat-container::-webkit-scrollbar-track {
        background-color: #F5F5F5;
    }
</style>