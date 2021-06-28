import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/actions/cart";
import { Addtocart } from "../../api/cart";
import { DeleteItem } from "../../api/items";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from "@material-ui/core";

function Item(props) {
  const { item, owner } = props;
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader title={item.ProductName} subheader={"Date: " + item.Date} />
      <CardMedia
        style={{ height: 0, paddingTop: "100%" }}
        image={item.Image}
        title={item.ProductName}
      />
      <CardContent>
        <Typography variant="body1">{item.Desc}</Typography>
        {owner ? (
          <>
            <hr />
            Your Item !
          </>
        ) : (
          <>
            <hr />
            Listed By :{" "}
            <Link
              to={`/profile/${item.Owner}`}
              style={{ textDecoration: "none" }}
            >
              {item.Owner}
            </Link>
          </>
        )}
      </CardContent>
      <CardActions>
        {owner ? (
          ""
        ) : (
          <IconButton onClick={() => dispatch(Addtocart(item._id))}>
            <ShoppingBasketIcon />
          </IconButton>
        )}
        <Typography variant="h6">{item.Price}$</Typography>
        <Grid style={{ flexGrow: 1 }} />
        {owner ? (
          <IconButton
            style={{ float: "right" }}
            onClick={() => dispatch(DeleteItem(item._id))}
          >
            <DeleteIcon color="error" />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default Item;
