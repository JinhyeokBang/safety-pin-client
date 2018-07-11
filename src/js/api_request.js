import axios from 'axios';

/** API 변경시 변경 **/
const baseURL = 'https://letscoding.kr:8888/api/v1';
const pRequest = (url, data, cb, fcb, ecb) => axios.post(baseURL + url, data).then(r => r.success ? cb(r) : fcb(r)).catch(e => ecb(e));
export default {
  signIn: (email, password, cb) => pRequest('/account/t/login', {email: email, password: password}, result =>
    cb(result.data.message.session, result.data.message.name), () => alert('잘못된 ID 또는 패스워드입니다.'), e => alert(e)),
  addStudent: (data, cb) => pRequest('/account/manage/student', data, cb, () => alert('로드 실패'),
    e => alert(e))
};