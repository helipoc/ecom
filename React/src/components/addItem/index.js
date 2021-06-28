import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../api/items";
import { setAlert } from "../../redux/actions/alert";
import axios from "axios";
import {
  Grid,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
function AddItem(props) {
  let [info, setData] = useState({});
  let [file, setFile] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setData({ ...info, [e.target.name]: e.target.value });

  const sendData = (e) => {
    const { file: SelectedFile } = file;
    e.preventDefault();
    let token = localStorage.getItem("token");
    const data = new FormData();
    data.append("image", SelectedFile);
    for (let param in info) {
      data.append(param, info[param]);
    }
    let url = "/items/add";

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        props.history.push("/");
        dispatch(api.LoadItems());
        dispatch(setAlert("Item Added !", "success"));
      });
  };

  return (
    <>
      <Grid
        style={{ marginTop: "10em" }}
        container
        direction="column"
        justify="space-between"
        spacing={4}
        alignContent="center"
      >
        <Typography variant="h5">Add an item</Typography>
        <form action="/items/add" method="post" encType="multipart/form-data">
          <Paper>
            <Grid item>
              <TextField
                label="Product name"
                autoComplete="off"
                name="ProductName"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                label="Price"
                name="Price"
                size="small"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="Desc"
                label="Product Description"
                fullWidth
                multiline
                onChange={handleChange}
                rows={8}
              />
            </Grid>
            <Grid item>
              Image :{" "}
              <input
                type="file"
                name="image"
                onChange={(e) => setFile({ file: e.target.files[0] })}
              />
              <IconButton>
                <SendIcon onClick={sendData} />
              </IconButton>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default AddItem;
