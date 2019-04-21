import request from "../../../../utils/request";

const baseService = "personalService";

//传ID
function onShow(obj) {
  return request(baseService+".onShow", obj, true);
}

export {
  onShow,
}
