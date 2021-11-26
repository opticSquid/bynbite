import { useState, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
import SimpleBackdrop from "./loader";

export default function Newpass() {
  const [loader, setLoader] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const data = new FormData(event.currentTarget);
    Axios.put("api/auth/resetpass", {
      email: sessionStorage.getItem("email"),
      password: data.get("password"),
    })
      .then((res) => {
        setLoader(false);
        alert(`${res.data.status}`);
        sessionStorage.removeItem("email");
        console.log(res.data);
      })
      .catch((err) => {
        setLoader(false);
        alert("Cannot process request. Try again");
        console.log(err);
      });
    // eslint-disable-next-line no-console
    console.log({
      password: data.get("password"),
    });
  };

  return (
    <Fragment>
      <SimpleBackdrop open={loader} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}
