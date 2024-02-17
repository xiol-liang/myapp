/**封装请求示例*/
//import asyncService from "@/api/asyncService;
// asyncService.getInfo({
//   paramKey:'paramVal'
// })

import {getConfig} from "@/config/index.js";
import axios from "axios";
import Vue from "vue";

const urlConfig = getConfig()
const isStatic = urlConfig.USE_STATIC
const timeout = urlConfig.TIMEOUT

axios.defaults.timeout = timeout ? 10000 : timeout;

function message(opts) {
    return Vue.prototype.$message(opts);
}

class AsyncService {

    generateUrl(source,name) {
        let  baseUrl = ''
        let  path = ''
        if(!name){
            baseUrl = urlConfig['BASE_URL']
            path = urlConfig['API_PREFIX']
        }else {
            //多个api需求时config.js和url-创建
            baseUrl = urlConfig[name+'_BASE_URL']
            path = urlConfig[name+'_API_PREFIX']
        }

        if(source.substring(0,4)=='/api'){
            return baseUrl + source;
        }else {
            return baseUrl + path + source;
        }
    }

    getAjax(url, param) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params:param
                })
                .then(res => {
                    resolve(res);
                })
                .catch(function (error) {
                    console.error(error);
                    reject(error);
                });
        });
    }

    postAjax(url, param) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, param)
                .then(res => {
                    resolve(res);
                })
                .catch(function (error) {
                    console.error(error);
                    reject(error);
                });
        });
    }

    fakeMockAjax(name,time){
        const isProduction = process.env.NODE_ENV === "production";
        const configUrl = (isProduction ? `/${process.env.VUE_APP_APPNAME}` : process.env.BASE_URL) + "/MOCK_JSON";
        let apiUrl = `${configUrl}/${name}.json`;
        return new Promise((resolve, reject) => {
            axios
                .get(apiUrl)
                .then(response => {
                    let data = response.data
                    if(time){
                        setTimeout(()=>{
                            resolve(data);
                        },time)
                    }else {
                        resolve(data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    successMessage(msg) {
        Vue.prototype.$message({message: msg, type: "success"})
    }
    errMessage(msg) {
        Vue.prototype.$message({message: msg, type: "error"})
    }

    async getDataFun(url, params, text, mockFile, mockKey) {
        let data
        if (isStatic) {
            let MOCK_JSON = await this.fakeMockAjax(mockFile)
            data = MOCK_JSON[mockKey]
        } else {
            try {
                const res = await this.postAjax(url, params);
                if (res.data.Code == 0) {
                    data = res.data.data
                }else if(res.status == 200){
                    data = res
                }
                else {
                    this.errMessage("获取" + text + "失败！");
                }
            } catch (err) {
                const msg = "请求" + text + "失败！";
                console.log(msg);
                // this.errMessage(msg);
            }
        }
        return data
    }
    async setDataFun(url,params,text){
        let data
        if (isStatic) {
            data = true
        } else {
            try {
                const res = await this.postAjax(url, params);
                if(res.data.Code==0){
                    data = true
                    this.successMessage(text+"成功！");
                }else {
                    this.errMessage(text+"失败！");
                    data = false
                }
            } catch (err) {
                this.errMessage("请求"+text+"失败！");
                data = false
            }
        }
        return data
    }


    // 获取数据接口示例
    async getInfo(params = {}) {
        return await this.getDataFun(this.generateUrl("/getInfo"),params,'获取信息','__mock','__GETINFO')
    }

    //初始化
    async getData(params) {
        return await this.getDataFun(this.generateUrl('/pbsjss/post_init_hltmbfpxx'), params)
    }

    //getZyzbInit
    async getZyzbInit(params) {
        return await this.getDataFun(this.generateUrl('/pbsjss/post_init_zyzbxx'), params)
    }

    //更新数据接口示例
    async setData(params = {}) {
        return await this.setDataFun(this.generateUrl("/setData"),params,'更新数据')
    }



}

let asyncService = null;
if(!asyncService){
    asyncService = new AsyncService(getConfig);
}

export default asyncService;
