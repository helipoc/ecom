import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...props }) {
  const logged = useSelector((state) => state.User.Token);
  if (logged) {
    return <Route component={Component} {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;
