// store/actions.js
import * as types from './mutation-types';

export default {
    login({ commit }) {
        // 模拟登录逻辑，然后将用户认证状态设置为 true
        commit(types.SET_AUTHENTICATION, true);
    },
    logout({ commit }) {
        // 模拟注销逻辑，然后将用户认证状态设置为 false
        commit(types.SET_AUTHENTICATION, false);
    },
};
