import axios from "axios";
import * as Actions from "../redux/actions/items";
import { setAlert } from "../redux/actions/alert";

let lastId = null;
let token = localStorage.getItem("token");
export function LoadItems() {
  return async (dispatch) => {
    let { data } = await axios.get("/items", {
      headers: { Authorization: `Bearer ${token}` },
    });
    lastId = data.length > 0 ? data[data.length - 1]._id : lastId;
    dispatch(Actions.ItemsLoaded(Array.isArray(data) ? data : []));
  };
}

export function LoadNext() {
  return async (dispatch) => {
    let { data } = await axios.get(`/items/${lastId.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    lastId = data[data.length - 1] ? data[data.length - 1]._id : null;
    dispatch(Actions.ItemsLoaded(data));
  };
}

export function DeleteItem(id) {
  /** Optimistic Delete no catching hopefuly nothing will happen  */
  return async (dispatch) => {
    dispatch(setAlert("Item Deleted", "success"));
    dispatch(Actions.ItemDeleted(id));
    axios.delete(`/items/${id.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}

export function SearchItem(query) {
  return async (dispatch) => {
    const { data } = await axios.post(
      "/items/search",
      { query },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.length == 0) {
      dispatch(setAlert("Item Not found", "error"));
    } else {
      dispatch(Actions.ItemsLoaded(data));
    }
  };
}
