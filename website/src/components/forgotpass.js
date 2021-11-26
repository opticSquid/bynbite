import { useState, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
import SimpleBackdrop from "./loader";
export default function Forgotpass() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const data = new FormData(event.currentTarget);
    Axios.get("api/auth/forgotpass", {
      headers: { email: data.get("email") },
    })
      .then((res) => {
        setLoader(false);
        alert(`${res.data.status}`);
        sessionStorage.setItem("email", data.get("email"));
        navigate("/newpass");
        console.log(res.data);
      })
      .catch((err) => {
        setLoader(false);
        alert("Cannot process request. Try again");
        console.log(err);
      });
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
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
            Forgot Password
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item>
                <NavLink
                  to="/"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  Remember Password? Sign In
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}
