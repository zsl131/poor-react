import request from '../../../../utils/request';

function list(query) {
  return request("articleService.list", JSON.stringify(query), true);
}

export {
  list
}
