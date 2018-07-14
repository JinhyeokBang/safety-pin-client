import axios from 'axios';

/** API 변경시 변경 **/
const baseURL = 'https://letscoding.kr:8888/api/v1';
const pRequest = (url, data, cb, fcb) => axios.post(baseURL + url, data).then(r => r.data.success ? cb(r.data) : fcb()).catch(e => alert(e));
export default {
  signIn: (email, password, cb) => pRequest('/account/t/login', {email, password}, result =>
    cb(result.message.session, result.message.name), cb, () => alert('잘못된 ID 또는 패스워드입니다.')),
  signUp: (email, password, name, className, info, cb) => pRequest('/account/t/register', {
    name, email, password, 'class': className, info
  }, cb, () => alert('회원가입에 실패하였습니다.')),
  addStudent: (data, cb) => pRequest('/manage/student', data, cb, () => console.log('학생을 추가하는데 실패했습니다.')),
  loadStudent: (data, cb) => pRequest('/account/t/load', data, cb, () => console.log('학생목록을 불러오는데 실패했습니다.')),
  loadChat: (data, cb) => pRequest('/chat/t/load', data, cb, () => console.log('채팅목록을 불러오는데 실패했습니다.'))
};