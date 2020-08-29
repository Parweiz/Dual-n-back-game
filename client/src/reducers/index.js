import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import scoreReducer from "./scoreReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  score: scoreReducer
});