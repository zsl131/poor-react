import request from "../../../../utils/request";

function findNoConfigTemplateMessage(query) {
  return request("adminIndexService.noConfig", query, true);
}

export {
  findNoConfigTemplateMessage,
}
