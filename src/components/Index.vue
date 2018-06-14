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
                <v-layout column="">
                    <v-jumbotron color="grey lighten-2" v-if="isLogin">

                        <v-container fill-height>
                            <v-layout align-center>
                                <v-flex>
                                    <h3 class="display-3">Welcome to the site</h3>
                                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad
                                        semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex
                                        eum, ne nam essent vocent admodum.</span>
                                    <v-divider class="my-3"></v-divider>
                                    <div class="title mb-3">Check out our newest features!</div>
                                    <v-btn large color="primary" class="mx-0">See more</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-jumbotron>
                    <v-jumbotron color="grey lighten-2" v-else>
                        <v-container fill-height>
                            <v-layout align-center>
                                <v-flex>
                                    <h3 class="display-3">로그인 하세요</h3>
                                    <span class="subheading">사이트에 왔음 로그인을 해야할 거 아녀 ㅡㅡ</span>
                                    <v-btn large color="primary" class="mx-0" @click="loginButtonClicked()">Login</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-jumbotron>
                    <v-layout row justify-center v-if="isLogin">
                        <v-flex sm6 lg4>
                            <v-card>
                                <v-list subheader>
                                    <v-subheader>연락처</v-subheader>
                                    <v-list-tile v-for="(contact, key) in contacts" :key="key" avatar>
                                        <v-list-tile-avatar>
                                            <v-icon>account_circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="contact.name"></v-list-tile-title>
                                            <v-list-tile-sub-title class="text--primary">{{ contact.tel }}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-btn to="/chat/(roomid)" icon>
                                                <v-icon color="primary">chat_bubble</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                        <v-flex sm6 lg4>
                            <v-card>
                                <v-list subheader>
                                    <v-subheader>연락처</v-subheader>
                                    <v-list-tile v-for="(contact, key) in contacts" :key="key" avatar>
                                        <v-list-tile-avatar>
                                            <v-icon>account_circle</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="contact.name"></v-list-tile-title>

                                            <v-list-tile-sub-title class="text--primary"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon :color="contact.active ? 'teal' : 'grey'">chat_bubble</v-icon>
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
    <!-- <div v-if="!signed">
            <button @click="replaceLink('/Signin')">
                로그인
            </button>
            <button @click="replaceLink('/Signup')">
                회원가입
            </button>
        </div> -->
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            signed: this.$session.exists(),
            drawer: true,
            items: [
                { title: 'Home', icon: 'dashboard', to:'/' },
                { title: 'Chat', icon: 'question_answer', to:'/chat' },
                { title: 'Calendar', icon: 'date_range', to:'/calendar' }                
            ],
            contacts: [
                {name: '신재헌 학부모님', tel: '010-1234-5678'},
                {name: '긷도현 학부모님', tel: '010-1234-5678'},
                {name: '권순호 학부모님', tel: '010-1234-5678'},                
            ],
            requests: [
                {name: '신재헌 학부모님', date: '010-1234-5678'},
                {name: '긷도현 학부모님', date: '010-1234-5678'},
                {name: '권순호 학부모님', date: '010-1234-5678'},          
            ],
            right: null,
            mini: true,
            isLogin: false
        }
    },
    methods: {
        replaceLink(link) {
            this.$router.push(link)
        },
        signout() {
            this.$session.destroy()
            this.signed = this.$session.exists()
        },
        loginButtonClicked() {
            this.$router.push("./signin")
        }
    },
    created() {
        if (this.$session.exists()) {
            this.isLogin = true
        }
    }
}
</script>

<style scoped>
    .main-container{
        width: 100%;
        min-height:100vh;
        display: flex;
        flex-direction: row;
    }
    .nav-container{
        height: 100vh;
        
    }
</style>