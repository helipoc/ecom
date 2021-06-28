import { combineReducers } from "redux";
import AlertReducer from "./reducers/Alerts";
import ItemsReducer from "./reducers/Items";
import CartReducer from "./reducers/Cart";
import UserReducer from "./reducers/User";
const rootReducer = combineReducers({
  Alert: AlertReducer,
  Items: ItemsReducer,
  Cart: CartReducer,
  User: UserReducer,
});

export default rootReducer;
