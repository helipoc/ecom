import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as api from "../../api/items";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert"
import AlertTitle from "@material-ui/lab/AlertTitle"
import { NavLink } from "react-router-dom";

import Item from "../item";

function Home(props) {
  const items = useSelector((state) => state.Items);
  const username = useSelector((state) => state.User.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(api.LoadItems());
  }, [username]);
  if (!username) {
    return (
      <div style={{ marginTop: "20%", marginLeft: "auto", marginRight: "auto", width: "70%" }}>
        <Alert severity="info">
          <AlertTitle>Information !</AlertTitle>
          Please  <NavLink to="/login" >Login</NavLink> to use the app
        </Alert>
      </div>
    )
  }
  if (username && items.length > 0) {
    return (
      <>
        <Grid container spacing={8} alignContent="center">
          {items.map((item) => (
            <Grow in={true} key={item._id}>
              <Grid item xs={12} md={4} key={item._id}>
                <Item item={item} owner={item.Owner === username} />
              </Grid>
            </Grow>
          ))}
        </Grid>
        {items.length > 9 && <Button
          style={{ marginTop: "2em", marginLeft: "90vw" }}
          onClick={() => dispatch(api.LoadNext())}
          color="primary"
          variant="contained"
        >
          NEXT PAGE
        </Button>}
      </>
    );
  } else {
    console.log(items)
    return "No avaiable Items ";
  }
}

export default Home;
