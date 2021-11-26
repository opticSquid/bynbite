import { useState, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
import SimpleBackdrop from "./loader";
export default function Login() {
  const [loader, setLoader] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const data = new FormData(event.currentTarget);
    Axios.post("api/auth/login", {
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        setLoader(false);
        alert(
          `${res.data.status}\nRefresh token and Access token stored in local storage`
        );
        localStorage.setItem("refreshToken", res.data.ref_tkn);
        localStorage.setItem("accessToken", res.data.acs_tkn);
        console.log(res.data);
      })
      .catch((err) => {
        setLoader(false);
        alert(err.response.data.status);
        console.log(err);
      });
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink
                  to="/forgotpass"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                  color="primary"
                >
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  to="/signup"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  Don't have an account? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}
