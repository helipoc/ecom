import React, { useState } from "react";
import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as api from "../../api/users";

function Login(props) {
  const [info, setInfo] = useState({ user: "", pass: "" });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleReg = () => {
    let args = Object.values(info);
    dispatch(api.Register(args[0], args[1]));
    setInfo({ user: "", pass: "" });
  };
  const handleLog = () => {
    let args = Object.values(info);
    dispatch(api.Login(args[0], args[1]));

    props.history.push("/");
  };

  return (
    <Paper style={{ margin: "10em auto ", width: "30%" }} elevation={4}>
      <Grid container direction="row" spacing={4} alignContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="username"
            name="user"
            value={info["user"]}
            variant="outlined"
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="password"
            type="password"
            name="pass"
            value={info["pass"]}
            variant="outlined"
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleLog}
          >
            Login
          </Button>{" "}
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleReg}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Login;
