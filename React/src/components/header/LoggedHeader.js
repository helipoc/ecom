import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink as Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Add from "@material-ui/icons/AddToPhotos";
import * as api from "../../api/users";
import { SearchItem } from "../../api/items";
import Grid from "@material-ui/core/Grid";
function Header() {
  const cart = useSelector((state) => state.Cart);
  const user = useSelector((state) => state.User);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const SearchHandler = (Searchquery) => {
    dispatch(SearchItem(Searchquery));
  };

  return (
    <div style={{ marginBottom: "5em" }}>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              SELLHUB
            </Link>
          </Typography>
          <TextField
            style={{ width: "50%", marginLeft: "2em" }}
            onChange={(e) => setSearch(e.target.value)}
          ></TextField>
          <IconButton edge="end" onClick={() => SearchHandler(search)}>
            <SearchIcon />
          </IconButton>
          <Grid style={{ flexGrow: 1 }}></Grid>

          <Link to="/add">
            <IconButton>
              <Add />
            </IconButton>
          </Link>
          <Link to="/profile">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <Link to="/checkout">
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </Link>

          <h6
            style={{
              position: "relative",
              left: "-1.8em",
              color: "white",
            }}
          >
            {cart.count || ""}
          </h6>

          <IconButton onClick={() => dispatch(api.Logout(user.Token))}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
