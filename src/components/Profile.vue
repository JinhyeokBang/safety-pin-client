<template>
    <section>
        <ParentsProfile />
        <router-link to="/myprofile">프로필 수정</router-link>
    </section>
</template>

<script>
import ParentsProfile from '@/components/ParentsProfile'

export default {
    name: 'Profile',
    components: {
        ParentsProfile
    },
    methods: {
        getSession () {
            return this.$session.get('session')
        }
    },
    created() {
        if (!this.$session.exists())
            this.$router.push('/signin')
        this.session = this.getSession()
    }
}
</script>

<style>
    
</style>