import React, { useEffect } from "react";
import Header from "./components/header";
import { Route, Switch, Redirect } from "react-router-dom";
import Alerts from "./components/alerts";
import Login from "./components/login";
import Home from "./components/home";
import { useDispatch } from "react-redux";
import Item from "./components/addItem";
import Profile from "./components/profile";
import Checkout from "./components/checkout";
import { Loaduser } from "./api/users";
import PrivateRoute from "./components/common/PrivateRoute";
import RestRoute from "./components/common/RestRoute";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(Loaduser(token));
    }
  }, []);

  return (
    <>
      <Header />
      <Alerts />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/add" exact component={Item} />
        <PrivateRoute path="/profile/:username" exact component={Profile} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <RestRoute path="/login" component={Login} />
        <PrivateRoute path="/checkout" component={Checkout} />
      </Switch>

    </>
  );
}

export default App;
