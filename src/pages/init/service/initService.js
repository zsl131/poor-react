import request from '../../../utils/request';

function remoteLoad() {
  return request("appConfigService.loadOne", JSON.stringify({}), true);
}

function initSystem(values) {
  return request("appConfigService.initSystem", JSON.stringify(values), true);
}

export {
  remoteLoad,
  initSystem,
}
