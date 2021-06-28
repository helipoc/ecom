import React from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink as Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
function Header() {
  const cart = useSelector((state) => state.Cart.count);
  return (
    <div style={{ marginBottom: "5em" }}>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6">
            <Link to="/">
              <img src="/logo.png" width="60" height="60" />
            </Link>
          </Typography>
          <Grid style={{ flexGrow: 1 }}></Grid>

          <Link to="/login">
            <Button>Login</Button>
          </Link>

          <h6
            style={{
              position: "relative",
              left: "-1.8em",
              color: "white",
            }}
          >
            {cart || ""}
          </h6>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
