import request from "../../../../utils/request";

const baseService = "personalService";

function list(query) {
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

//传ID
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

//传ID
function onShow(obj) {
  return request(baseService+".onShow", obj, true);
}

export {
  list,
  addOrUpdate,
  onShow,
  loadOne
}
