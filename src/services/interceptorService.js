import request from '../utils/request';

/*
function loadAppConfig() {
  //console.log("interceptor - initBase");
  return request("appConfigService.loadOne", JSON.stringify({}), true);
}

function loadWxConfig() {
  return request("wxConfigService.loadOne", {}, true);
}
*/

function loadWebBaseConfig() {
  return request("webInterceptorService.loadWebBase",{},true);
}

function queryLoginAccount(code) {
  return request("wxAccountService.queryAccountByCode", code, true);
}

export {
  /*loadAppConfig,
  loadWxConfig,*/
  queryLoginAccount,
  loadWebBaseConfig,
}
