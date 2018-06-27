/** API 변경시 변경 **/
const baseURI = 'https://letscoding.kr:8888/api/v1';
let $http;
const postRequest = (url, data, cb, fcb, ecb) => $http.post(url, data).then(r => r.success ? cb(r) : fcb(r)).catch(e => ecb(e));
export default {
  set$http: http => $http = http,
  signIn: (email, password, callback) => postRequest(`${baseURI}/account/t/login`, {email: email, password: password},
    result => callback(result.data.message.session, result.data.message.name), () => alert('잘못된 ID 또는 패스워드입니다.'), e => alert(e))

};