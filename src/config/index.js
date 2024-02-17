/**接口配置说明（不需要请删除）
 * 开发环境读取devConfig中的配置，作为开发状态接口配置
 * 生产环境读取/public/url-config.json文件，方便打包后的接口修改
 * 参数USE_STATIC是提供真实接口请求和本地假数据请求两种模式切换
 * 当前工程/src/api/asyncService.js是结合当前接口配置的示范接口封装，不需要请删除
 *
 *关联文件 "/public/MOCK_JSON"
 *关联文件 "/public/url-config.json"
 *关联文件 "/src/api/asyncService.js"
 *关联代码 "/src/main.js" 中 import { setConfig } from "@/config"; setConfig()
 * */
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const configUrl = (isProduction ? `/${process.env.VUE_APP_APPNAME}` : process.env.BASE_URL) + "/url-config.json";
const configName = `${process.env.VUE_APP_APPNAME}_CONFIG`;

export const devConfig = {
    "USE_STATIC": false,
    "BASE_URL": "http://10.11.21.153:3886",
    "API_PREFIX": "/api/PBZHKZ",
    "webSocketAPI": {
        "host": "10.11.21.233",
        "port": "3906",
        "channel": ""
    },
    "TIMEOUT":10000
};

export const getConfig = () => {
    return window.esapp[configName];
}

export const setConfig = () => {
    if (isProduction) {
        try {
            window.esapp[configName] = {};
            axios.get(configUrl)
                .then(res => {
                    window.esapp[configName] = res.data;
                })
                .catch(e => {
                    console.error(`${process.env.VUE_APP_APPNAME}请求url配置文件出错，原因:`, e);
                });
        } catch (e) {
            console.log(e)
        }
    } else {
        window.esapp[configName] = devConfig;
    }
}
