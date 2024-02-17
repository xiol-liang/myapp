// store/mutations.js
import * as types from './mutation-types';

export default {
    [types.SET_AUTHENTICATION](state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
};
