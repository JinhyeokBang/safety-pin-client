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
            <nav>
                <v-list subheader>
                    <v-subheader>Recent chat</v-subheader>
                    <v-list-tile v-for="item in chatList" :key="item.key" avatar>
                    <v-list-tile-avatar>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                    </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </nav>
            <section class="content">
                 <v-list id="chatContent">
                    <v-list-tile v-for="item in chatMessages" :key="item.timestp" avatar>
                        <v-list-tile-avatar>
                            <v-icon>account_circle</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.teacher"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.chat"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-card flat>
                        <v-form>
                            <v-text-field></v-text-field>
                            <v-btn flat color="blue">보내기</v-btn>
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
        getSession () {
            return this.$session.get('session')
        },
        loadChatMessageMethod(session) {
            const baseURI = 'https://letscoding.kr:8888/api/v1'
            this.$http.post(`${baseURI}/chat/t/load`, {
                session: this.session
            })
            .then((result) => {
                this.loadChatSuccessed(result.data.message.chat)
            })
            .catch((err) => {
                alert(err)
            })
        },
        loadChatSuccessed(chat) {
            this.chatMessages = chat
        },
        sendChatMessageMethod(session, parent, id, chat) {
            const baseURI = 'https://letscoding.kr:8888/api/v1'
            this.$http.post(`${baseURI}/chat/t/send`, {
                session: this.session
            })
            .then((result) => {
                this.sendChatSuccessed(result.data.message.chat)
            })
            .catch((err) => {
                alert(err)
            })
        },
        sendChatMessageSuccessed() {

        }
    },
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'dashboard', to:'/' },
                { title: 'Chat', icon: 'question_answer', to:'/chat' },
                { title: 'Calendar', icon: 'date_range', to:'/calendar' }                
            ],
            chatList: [
                { key: "1", title: '방진혁 부모님', icon: 'avatar', chatRoomId: "123123"},
                { key: "2", title: '방진혁 부모님', icon: 'avatar', chatRoomId: "123123"},
                { key: "3", title: '방진혁 부모님', icon: 'avatar', chatRoomId: "123123"},
                { key: "4", title: '방진혁 부모님', icon: 'avatar', chatRoomId: "123123"},
                { key: "5", title: '방진혁 부모님', icon: 'avatar', chatRoomId: "123123"}
            ],
            chatMessages: [
            
            ],
            right: null,
            mini: true
        }
    },
    created() {
        if (!this.$session.exists())
            this.$router.push('/SigninPlease')
        this.session = this.getSession()
        this.loadChatMessageMethod(this.session)
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
  .calendar {
    float:left;
  }
  #chatContent {
      height: 90vh;
  }
</style>