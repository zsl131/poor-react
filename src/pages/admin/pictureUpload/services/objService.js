import request from "../../../../utils/request";

const baseService = "pictureUploadService";

function list(query) {
  return request(baseService+".list", query, true);
}

//传ID
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

//传ID
function deleteObj(obj) {
  return request(baseService+".delete", obj, true);
}

export {
  list,
  deleteObj,
  loadOne
}
