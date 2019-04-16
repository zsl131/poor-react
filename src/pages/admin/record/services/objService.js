import request from "../../../../utils/request";

const baseService = "recordService";

function list(query) {
  return request(baseService+".list", query, true);
}

export {
  list,
}
