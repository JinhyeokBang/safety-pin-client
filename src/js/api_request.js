import axios from 'axios';

/** API 변경시 변경 **/
const baseURL = 'https://letscoding.kr:8888/api/v1';
const pRequest = (url, data, cb, fcb) => axios.post(baseURL + url, data).then(r => r.data.success ? cb(r.data) : fcb()).catch(e => console.log(e));
export default {
  signIn: (email, password, cb) => pRequest('/account/t/login', {email, password}, cb, () => alert('잘못된 이메일이거나 패스워드입니다.')),
  signInM: (email, password, cb) => pRequest('/account/m/login', {email, password}, cb, () => alert('잘못된 이메일이거나 패스워드입니다.')),
  signUp: (email, password, name, className, info, cb) => pRequest('/account/t/register', {
    name, email, password, 'class': className, info
  }, cb, () => alert('회원가입에 실패하였습니다.')),
  addStudent: (data, cb) => pRequest('/manage/student', data, cb, () => alert('학생을 추가하는데 실패했습니다.')),
  loadStudent: (data, cb) => pRequest('/account/t/load', data, cb, () => alert('학생 목록을 불러오는데 실패했습니다.')),
  loadStudentM: (data, cb) => pRequest('/manage/load', data, cb, () => alert('학생 목록을 불러오는데 실패했습니다.')),
  loadChat: (data, cb) => pRequest('/chat/t/load', data, cb, () => alert('채팅 목록을 불러오는데 실패했습니다.')),
  sendChat: (data, cb) => pRequest('/chat/t/send', data, cb, () => alert('채팅 전송에 실패했습니다.')),
  loadCalendar: (data, cb) => pRequest('/pin/request-list', data, cb, () => alert('요청을 불러오는데 실패했습니다.')),
  loadPin: (data, cb) => pRequest('/manage/pin-list', data, cb, () => alert('PIN 목록을 불러오는데 실패했습니다.')),
  loadLogs: (data, cb) => pRequest('/manage/logs', data, cb, () => alert('로그를 불러오는데 실패했습니다.')),
  ignore: (data, cb) => pRequest('/pin/ignore', data, cb, () => alert('요청을 삭제하는데 실패했습니다.')),
  deletePin: (data, cb) => pRequest(`/pin/delete/${data.pin}`, {id: data.id, session: data.session}, cb, () => alert('요청을 삭제하는데 실패했습니다.')),
  editPin: (data, cb) => pRequest(`/pin/edit`, data, cb, () => alert('요청을 수정하는데 실패했습니다.')),
  acceptPin: (data, cb) => pRequest(`/pin/accept`, data, cb, () => alert('요청을 수락하는데 실패했습니다.')),
  createPin: (data, cb) => pRequest(`/pin/create`, data, cb, () => alert('PIN을 생성하는데 실패했습니다.')),

};