import { combineReducers } from "redux";
import reducerSearch from "./reducerSearch";
import reducerNavbar from "./reducerNavbar";
import reducerCurrentItem from "./reducerCurrentItem";

export const RootReducer = combineReducers({ reducerSearch,reducerNavbar ,reducerCurrentItem });

export default RootReducer;
