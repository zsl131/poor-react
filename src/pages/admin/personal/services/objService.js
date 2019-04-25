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

function updateBasic(obj) {
  return request(baseService+".updateBasic", obj, true);
}

function updateWork(obj) {
  return request(baseService+".updateWork", obj, true);
}

function updateMove(obj) {
  return request(baseService+".updateMove", obj, true);
}

function updateStudy(obj) {
  return request(baseService+".updateStudy", obj, true);
}

function updateSafe(obj) {
  return request(baseService+".updateSafe", obj, true);
}

function updateIndustry(obj) {
  return request(baseService+".updateIndustry", obj, true);
}

function addPersonal(obj) {
  return request(baseService+".addPersonal", obj, true);
}

function addAssets(obj) {
  return request(baseService+".addAssets", obj, true);
}

export {
  list,
  addOrUpdate,
  onShow,
  loadOne,
  updateBasic,
  updateWork,
  updateMove,
  updateStudy,
  updateSafe,
  updateIndustry,
  addPersonal,
  addAssets,
}
