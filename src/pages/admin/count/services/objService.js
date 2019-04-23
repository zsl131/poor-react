import request from "../../../../utils/request";

const baseService = "countService";

function index(query) {
  return request(baseService+".index", query, true);
}

export {
  index,
}
