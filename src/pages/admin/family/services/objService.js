import request from "../../../../utils/request";

const baseService = "familyService";

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
function deleteObj(obj) {
  return request(baseService+".delete", obj, true);
}

function showPlant(obj) {
  return request("familyPlantService.showPlant", obj, true);
}

export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
  showPlant,
}
