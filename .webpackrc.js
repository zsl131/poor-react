import { resolve } from 'path';

export default {
  // 接口代理示例
  proxy: {
    //程序接口
    "/api": {
      "target": "http://test.example.com:86/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    //编辑器上传文件路径
    "/wangeditor": {
      "target": "http://test.example.com:86/wangeditor/",
      "changeOrigin": true,
      "pathRewrite": { "^/wangeditor" : "" }
    },
    //Upload上传文件路径
    "/publicFile": {
      "target": "http://test.example.com:86/publicFile/",
      "changeOrigin": true,
      "pathRewrite": { "^/publicFile" : "" }
    },
    //微信调用配置
    "/wxRemote": {
      "target": "http://test.example.com:86/wxRemote/",
      "changeOrigin": true,
      "pathRewrite": { "^/wxRemote" : "" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },

  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
