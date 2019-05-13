import request from "../../../../utils/request";

const baseService = "moveCountService";

function index(query) {
  return request(baseService+".index", query, true);
}

function findByBqsj(query) {
  return request(baseService+".findByBqsj", query, true);
}

function queryData(query) {
  return request(baseService+".queryData", query, true);
}

export {
  index,
  findByBqsj,
  queryData,
}
