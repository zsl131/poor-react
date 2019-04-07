const APP_CONFIG_SESSION_NAME = "appConfig";

export function setAppConfig(appConfigStr) {
  sessionStorage.setItem(APP_CONFIG_SESSION_NAME, appConfigStr);
}

export function getAppConfig() {
  return sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
}

export function getAppConfig2Obj() {
  const appConfig = getAppConfig();
  if(appConfig){
    return JSON.parse(appConfig);
  } else {
    return {};
  }
}
