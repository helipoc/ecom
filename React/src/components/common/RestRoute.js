import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function RestRoute({ component: Component, ...props }) {
  const logged = useSelector((state) => state.User.Token);
  if (logged) {
    return <Redirect to="/" />;
  } else {
    return <Route component={Component} {...props} />;
  }
}

export default RestRoute;
