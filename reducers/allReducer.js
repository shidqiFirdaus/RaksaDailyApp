/* eslint-disable prettier/prettier */
//LIST REDUCER
  import reducer_mkg from "./marketing/reducer_mkg.js";
  // import reducer_spk_klaim from "./spk_klaim/reducer_spk_klaim";
//
import { combineReducers } from "redux";

const initial_json_login = {

};
const login_user = (state=initial_json_login, action) => {
  switch (action.type) {
    case "SAVE_LOGIN_INFO":
      // CARA KE 1
      // return {
      //   ...state,
      //   nama_user     : action.payload.nama_user,
      //   app_version   : action.payload.app_version,
      //   dept          : action.payload.dept,
      //   dept_full     : action.payload.dept_full
      // };

      // //CARA KE 2
      // state.nama_user= action.payload.nama_user
      // state.app_version = action.payload.app_version
      // state.dept = action.payload.dept
      // state.dept_full = action.payload.dept_full
      // return {
      //   ...state
      // }

      //CARA KE 3
      return action.payload

    default:
      return state;
  }
}

//GABUNGIN SEMUA REDUCERS
const allReducer = combineReducers(
  {
    data_login      : login_user,
    data_marketing   : reducer_mkg,
    // data_spk_klaim  : reducer_spk_klaim
  }
);

export default allReducer;