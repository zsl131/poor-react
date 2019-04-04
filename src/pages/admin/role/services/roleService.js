import request from '../../../../utils/request';

function list(query) {
  //console.log("list query :", query);
  return request("roleService.list", JSON.stringify(query), true);
}

function add(obj) {
  return request("roleService.add", JSON.stringify(obj), true);
}

function update(obj) {
  return request("roleService.update", JSON.stringify(obj), true);
}

function deleteObj(id) {
  return request("roleService.delete", JSON.stringify(id), true);
}

function loadOne(id) {
  return request("roleService.loadOne", JSON.stringify(id), true);
}

function listMenuIds(rid) {
  return request("roleService.listRoleMenuIds", JSON.stringify(rid), true);
}

function authMenu(obj) {
  return request("roleService.authMenu", JSON.stringify(obj), true);
}

export {
  list,
  add,
  update,
  deleteObj,
  loadOne,
  listMenuIds,
  authMenu,
}
