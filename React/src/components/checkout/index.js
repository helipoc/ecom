import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, IconButton, Button } from "@material-ui/core";
import Footer from "../../components/footer"
import DeleteIcon from "@material-ui/icons/Delete";
import * as api from "../../api/cart";
function Checkout(props) {
  const cart = useSelector((state) => state.Cart);
  let total = 0;
  const dispatch = useDispatch();
  const removeHandler = (id) => api.DeleteFromcart(id);

  useEffect(() => {
    dispatch(api.LoadCart());
  }, []);

  console.log(cart.items)

  if (cart.items?.length > 0) {
    return (
      <>
        <Paper style={{ width: "50vh", margin: "0 auto" }}>
          <Grid container direction="column" spacing={3}>
            {cart.items.map((cartItem, id) => {
              total += cartItem.Price;
              return (
                <Grid item key={cartItem._id}>
                  <b style={{ marginLeft: "5" }}>
                    {cartItem.ProductName} | Price : {cartItem.Price}{" "}
                    <IconButton
                      onClick={() => dispatch(removeHandler(cartItem._id))}
                    >
                      <DeleteIcon color="error" />{" "}
                    </IconButton>
                  </b>
                </Grid>
              );
            })}
          </Grid>
          <Button color="primary" onClick={() => window.open("https://paypal.com/", "_blank").focus()}>
            Buy
          </Button>
          <p style={{ float: "right" }}>
            Total = <b>{total}$</b>
          </p>
          <Footer />
        </Paper>
      </>
    );
  }
  return <p>No items</p>;
}

export default Checkout;
