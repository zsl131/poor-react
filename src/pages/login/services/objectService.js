import request from "../../../utils/request";

const wxLoginService = "wxLoginService";
const smsService = "smsService";
function queryWxLogin(query) {
  return request(wxLoginService+".buildQr", query, true);
}

function wxLoginCheck(query) {
  return request(wxLoginService+".wxLoginCheck", query, true);
}

function sendCode(phone) {
  return request(smsService+".sendCodeByLogin", phone, true);
}


export {
  queryWxLogin,
  sendCode,
  wxLoginCheck,
}
