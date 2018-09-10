import { combineReducers } from "redux";

import { crudReducer } from "./crud.reducer";
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { category } from './category.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  crudReducer,
  category
});

export default rootReducer;




