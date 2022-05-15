import { useContext } from "react";
import TokenContext from "../TokenContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { API_BACKEND, http } from "../apiService";

import logoImg from "../assets/1.png";

export default function LogIn() {
  const { token } = useContext(TokenContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      await http.get(API_BACKEND + "/v1/candidates");
    } catch (error) {
      console.log(error);
    }

    // axios
    //   .post("https://localhost:8000/api/v1/auth/", { email, password })
    //   .then(({ data }) => {
    //     setToken({
    //       token: data.token,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("An error occurred, please try again later.");
    //   });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logoImg} alt="" className="" width={300} />

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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
              sx={{ mt: 3, mb: 2, backgroundColor: "#3F51B5" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
