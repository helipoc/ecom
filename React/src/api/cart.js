import axios from "axios";
import { setAlert } from "../redux/actions/alert";
import { addItem, LoadItems, RemovedItem } from "../redux/actions/cart";

const token = localStorage.getItem("token");
export function Addtocart(id) {
  return async (dispatch) => {
    await axios.post(
      "/cart/add",
      { itemId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setAlert("Item Added", "success"));
    dispatch(addItem());
  };
}

export function LoadCart() {
  return (dispatch) => {
    axios
      .get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => dispatch(LoadItems(data)));
  };
}

// Optimistic delete action what's the worst that could happen ?
export function DeleteFromcart(id) {
  return (dispatch) => {
    dispatch(RemovedItem(id));
    dispatch(setAlert("Item Removed", "warning"));
    axios
      .delete("/cart/remove", {
        data: { itemId: id },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log(res.data));
  };
}

export function Buy() {
  return async (dispatch) => {
    const { data } = await axios.post("/cart/buy", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    if (data.success) {
      dispatch(setAlert("Successful Payment", "success"));
      dispatch(LoadItems());
    } else {
      dispatch(setAlert("Sold is not enough", "error"));
    }
  };
}
