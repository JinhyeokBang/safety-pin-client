<template>
  <v-app>
    <section class="main-container">
      <sideMenu :name="name"></sideMenu>
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
            <v-form @keyup.enter.native="sendChat(chat)">
              <v-text-field v-model="chat"></v-text-field>
              <v-btn flat color="blue" @click="sendChat(chat)">보내기</v-btn>
            </v-form>
          </v-card>
        </v-list>

      </section>
    </section>
  </v-app>
</template>

<script>
  import sideMenu from './sideMenu'

  export default {
    name: "ChatList",
    components: {sideMenu},
    methods: {
      getSession() {
        return this.$session.get('session')
      },
      loadChat() {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/chat/t/load/`, {
          session: this.session,
          id: this.$route.params.child_id
        }).then(result => this.chatMessages = result.data.message.chat)
          .catch(err => alert(err))
      },
      sendChat(chat) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.post(`${baseURI}/chat/t/send`, {session: this.session, id: this.$route.params.child_id, chat: chat})
          .then(() => this.loadChat())
          .catch(() => alert('채팅 전송에 오류가 발생하였습니다.'));
        this.chat = "";
      },
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
      if (!this.$session.exists()) this.$router.push('/signin');
      this.session = this.getSession();
      this.loadChat(this.session);
      setInterval(() => this.loadChat(), 5000);
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