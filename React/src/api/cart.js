import axios from "axios";
import { setAlert } from "../redux/actions/alert";
import { addItem, LoadItems, RemovedItem } from "../redux/actions/cart";

const token = localStorage.getItem("token");
export function Addtocart(id) {


  return async (dispatch) => {
    const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");

  return (dispatch) => {
    axios
      .get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => dispatch(LoadItems(data)));
  };
}


export function DeleteFromcart(id) {
  return (dispatch) => {
    dispatch(RemovedItem(id));
    dispatch(setAlert("Item Removed", "warning"));
    axios
      .delete("/cart/remove", {
        data: { itemId: id },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(LoadCart()));
  };
}

export function Buy() {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
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
