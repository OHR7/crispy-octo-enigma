import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";

import { API_BACKEND, axios as http } from "../apiService";
import useToken from "../hooks/useToken";

export default function CustomAppBar({ user }) {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  const logout = async () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link
            href="/"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              marginRight: 4,
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            Kudos
          </Link>
          <Box sx={{ display: "flex" }}>
            <Link
              href="/my-kudos"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                marginRight: 4,
              }}
            >
              My Kudos
            </Link>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {`Welcome, ${user.username} to ${user.organization.name}`}
            </Typography>
          </Box>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
