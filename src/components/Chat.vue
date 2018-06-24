<template>
    <section>
        <p>채팅 방</p>
        <ul>

        </ul>
        <input type="text"/>
        <button>추가</button>
    </section>
</template>

<script>
  export default {
    name: "Chat",
    props: [
      "roomId"
    ],
    data() {
      return {
        isConnected: false
      }
    },
    methods: {
      loadNewMessage(session) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.get(`${baseURI}`, {
          params: {
            "session": session
          }
        })
          .then((result) => {
            this.events = result.data.calendar
          })
          .catch((err) => {
            alert(err)
          })
      },
      loadAllMessage(session) {
        const baseURI = 'https://letscoding.kr:8888/api/v1';
        this.$http.get(`${baseURI}`, {
          params: {
            "session":
            session
          }
        })
          .then((result) => {
            this.events = result.data.calendar
          })
          .catch((err) => {
            alert(err)
          })
      }
    }
  }
</script>

<style>

</style>
