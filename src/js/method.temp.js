// // load () {
//
// // }
//
// accept (session, id) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/pin/accept`, {
//       session: this.session,
//       id: this.id
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// ignore (session, id) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/pin/ignore`, {
//       session: this.session,
//       id: this.id
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// edit (session, id, expires) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/pin/ignore/${id}`, {
//       session: this.session,
//       expires: this.expires
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// delete (session, id) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/pin/ignore/${id}`, {
//       session: this.session
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// valid (session, id) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.get(`${baseURI}/pin/ignore/${id}`)
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// create(session, target) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/pin/create`, {
//       session: this.session,
//       target: this.target
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// signin(session, email, password) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/account/t/login`, {
//       session: this.session,
//       email: this.email,
//       password: this.password
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// signup(session, email, password, classNumber, info) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/account/t/register`, {
//       session: this.session,
//       email: this.email,
//       password: this.password,
//       class: this.classNumber,
//       info: this.info
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// loadChat(session) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/chat/load`, {
//       session: this.session
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
//
// sendChat(session, id, teacher, chat) {
//     const baseURI = 'https://letscoding.kr:8888/api/v1'
//     this.$http.post(`${baseURI}/chat/send`, {
//       session: this.session,
//       teacher: this.teacher,
//       chat: this.chat,
//       id: this.id
//     })
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }