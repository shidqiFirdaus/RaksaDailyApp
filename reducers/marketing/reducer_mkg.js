import { combineReducers } from "redux";

const initial_data = {
};


const mkg_history = (state = initial_data, action) => {
  switch (action.type) {
    case "MKG_DETAIL_HISTORY":
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




const mkg_monitoring = (state = initial_data, action) => {
  switch (action.type) {
    case "MKG_DETAIL_MONITORING":
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


const mkg_edit_data = (state = initial_data, action) => {
  switch (action.type) {
    case "MKG_EDIT_DATA":
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

const merge_reducer=combineReducers({
  json_detail_history      : mkg_history,
  json_detail_monitoring   : mkg_monitoring,
  json_edit_data           : mkg_edit_data
});

export default merge_reducer;