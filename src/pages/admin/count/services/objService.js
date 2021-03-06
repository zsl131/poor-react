import request from "../../../../utils/request";

const baseService = "countService";

function index(query) {
  return request(baseService+".index", query, true);
}

function queryData(query) {
  return request(baseService+".queryData", query, true);
}

export {
  index,
  queryData,
}
