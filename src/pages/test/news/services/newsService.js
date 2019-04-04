import request from '../../../../utils/request';

function query(query) {
  console.log("query", query);
  return request("newsService.listNews", JSON.stringify(query), true);
}
export {
  query,
}
