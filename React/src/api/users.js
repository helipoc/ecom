import axios from "axios";
import * as Actions from "../redux/actions/alert";
import { UserTypes as Types } from "../redux/Types";

export function Register(user, pass) {
  return (dispatch) => {
    if (user === "" || pass === "") {
      dispatch(Actions.setAlert("Please Fill user and pass fields", "warning"));
      return;
    }
    axios
      .post("/user/register", { username: user, password: pass })
      .then((res) => dispatch(Actions.setAlert("User Created", "info")))
      .catch((err) =>
        dispatch(Actions.setAlert("Please select another username", "warning"))
      );
  };
}

export function Login(user, pass) {
  return async (dispatch) => {
    try {
      let { data } = await axios.post("/user/login", {
        username: user,
        password: pass,
      });
      console.log(data);
      if (data.token) {
        dispatch(Actions.setAlert("You logged in Successfuly", "success"));
        localStorage.setItem("token", data.token);
        dispatch(Loaduser(data.token));
      } else {
        dispatch(Actions.setAlert("Invalid Login", "error"));
      }
      {
      }
    } catch (err) {
      dispatch(Actions.setAlert("Somthing went wrong", "error"));
    }
  };
}

export function Loaduser(token) {
  return (dispatch) => {
    axios
      .get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: Types.SET_USER, payload: res.data });
        localStorage.setItem("token", res.data.Token);
      })
      .catch((e) => console.log(e));
  };
}

export function Logout(token) {
  return (dispatch) => {
    axios
      .get("/user/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: Types.USER_LOGOUT });
        localStorage.removeItem("token");
        dispatch(Actions.setAlert("You Logged out !", "info"));
      })
      .catch((e) => console.log(e));
  };
}
