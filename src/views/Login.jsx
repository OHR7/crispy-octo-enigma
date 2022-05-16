import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../TokenContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { API_BACKEND } from "../apiService";
import axios from "axios";

import logoImg from "../assets/1.png";

export default function LogIn() {
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: API_BACKEND,
  });

  const { setToken } = useContext(TokenContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const data = await instance.post(API_BACKEND + "api/v1/auth/", {
        username: formData.get("username"),
        password: formData.get("password"),
      });
      console.log(data);
      setToken(
        {
          token: data.data.token,
        },
        navigate("/", { replace: true })
      );
    } catch (error) {
      console.log(error);
    }
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
