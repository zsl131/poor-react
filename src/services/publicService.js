import request from '../utils/request';

function listRecommentActivity(query) {
  return request("activityService.listRecommend", query, true);
}

function findJsApi(query) {
  return request("JSApiService.buildJsApi", query, true);
}

export {
  listRecommentActivity,
  findJsApi,
}
