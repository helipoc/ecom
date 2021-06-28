import React from "react";
import GuestHeader from "./GuestHeader";
import LoggedHeader from "./LoggedHeader";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.User);
  return <div>{user.Token ? <LoggedHeader /> : <GuestHeader />}</div>;
}

export default Header;
