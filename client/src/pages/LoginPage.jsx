import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toastWarn } from "../helpers/toastify";
import useAuthServices from "../services/useAuthServices";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const { loginApi } = useAuthServices();

  const [inputs, setInputs] = useState({
    email: "admin@admin.com",
    password: "Admin10?",
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /.+@.+\..+/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.?!@#$%&*])[A-Za-z\d.?!@#$%&*]{8,16}$/;

    if (!inputs.email || !inputs.password) {
      toastWarn("Fields are empty!!");
      return;
    }
    if (!emailRegex.test(inputs.email)) {
      toastWarn("Invalid Email format!!");
      return;
    }
    if (!passwordRegex.test(inputs.password)) {
      toastWarn(
        "Invalid password format! - it must contain 8 to 16 length | 1 upper | 1 lower | 1 number | 1 special[.?!@#$%&*] character"
      );
      return;
    }
    console.log(inputs);
    loginApi(inputs);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Login
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
              type="email1"
              autoComplete="email"
              autoFocus
              value={inputs.email}
              onChange={handleChange}
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
              value={inputs.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          
        </Box>
        <Box mt={3} sx={{borderBottom:'1px solid black'}}>
            <Box sx={{borderTop:'1px solid black'}}>Admin:</Box>
            <Box ml={3}>Email: admin@admin.com</Box>
            <Box ml={3}>Password: Admin10?</Box>

            <Box sx={{borderTop:'1px solid black'}}>Normal user:</Box>
            <Box ml={3}>Email: test@test.com</Box>
            <Box ml={3}>Password: Testtest10?</Box>
          </Box >
      </Container>
    </ThemeProvider>
  );
}
