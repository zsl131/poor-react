import {getAuthMenus} from "../utils/authUtils";

import ReactDOM from 'react-dom';
const authMenus = getAuthMenus();
window.onload = function() {
  const authList = document.getElementsByClassName("auth");
  for(let item in authList) {
    // console.log(item,"----")
    if(item&&item!='length' && item!='item' && item!='namedItem') {
      const sn = authList[item].attributes["sn"]["nodeValue"];
      console.log(sn);
      if(checkHrefAuth(sn)) {
        console.log(sn+"============YES");
      } else {
        console.log(sn+"-------------------NO");
        // document.removeChild(item);
        authList[item].remove();
      }
    }
  }
}

function checkHrefAuth(sn) {
  for(const auth of authMenus) {
    const href = auth.href;
    if(href!='#' && href.startsWith(sn)) {
      return true;
    } else {return false;}
  }
}
