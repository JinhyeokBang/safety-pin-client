<template>
    <section>
        <p>프로필 설정</p>
        <router-link to="/profile">뒤로 가기</router-link><br/>
        이름:<input type="text" v-model="profile.name"/><br/>
        담당반:<input type="text" v-model="profile.classNumber"/><br/>
        한줄소개:<textarea v-model="profile.intro"></textarea><br/>
        <button @click="updateProfile(session, profile)">적용</button>
    </section>
</template>

<script>
export default {
    name: 'MyProfile',
    data() { 
        return {
            session: null,
            profile: {
                name: "로딩 중",
                classNumber: "로딩 중",
                intro: "로딩 중"
            }
        }
    },
    methods: {
        loadProfile(session) {
            const baseURI = 'https://letscoding.kr:8888/api/v1'
            this.$http.get(`${baseURI}`, {
                params: {
                    "session": session
                }
            })
            .then((result) => {
                this.profile.name = result.data.profile.name
                this.profile.classNumber = result.data.profile.classNumber
                this.profile.intro = result.data.profile.intro
            })
            .catch((err) => {
                alert(err)
            })
        },
        updateProfile(session, profile) {
            const baseURI = 'https://letscoding.kr:8888/api/v1'
            this.$http.put(`${baseURI}`, {
                params: {
                    "session": session,
                    "profile": profile
                }
            })
            .then((result) => {
                
            })
            .catch((err) => {
                alert(err)
            })
        },
        getSession () {
            return this.$session.get('session')
        }
    },
    created() {
        if (this.$session.exist)
            this.$router.push('/signin')
        this.session = this.getSession()
        this.loadProfile(this.session)
    }
}
</script>

<style>
    
</style>