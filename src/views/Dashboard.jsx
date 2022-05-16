import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CustomAppBar from "../components/AppBar";
import { API_BACKEND, axios as http } from "../apiService";
import useToken from "../hooks/useToken";

export default function Dashboard() {
  const [coworker, setCoworker] = useState("");
  const [coworkers, setCoworkers] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    organization: { name: "" },
    kudos_counter: 0,
  });
  const { removeToken } = useToken();

  const handleCoworkerChange = (event) => {
    setCoworker(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await http.post(API_BACKEND + `api/v1/kudos/give/${coworker}/`, {
        message,
      });
      setOpen(true);
      setCoworker("");
      setMessage("");
      let newUser = { ...user };
      newUser.kudos_counter -= 1;
      setUser(newUser);
    } catch (error) {
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const coworkersData = await http.get(
          API_BACKEND + "api/v1/users/organization/"
        );
        setCoworkers(coworkersData.data);
      } catch (error) {
        removeToken();
      }
    })();

    (async () => {
      const user = await http.get(API_BACKEND + "api/v1/users/profile/");
      setUser(user.data);
    })();
  }, [removeToken]);

  return (
    <>
      <CustomAppBar user={user} />
      <Grid container justifyContent="center" sx={{ marginY: 7 }} spacing={2}>
        <Grid item xs={5} sm={4} md={3}>
          <Paper>
            <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#3F51B5",
                  marginRight: 2,
                }}
              >
                {user.kudos_counter}
              </Avatar>
              <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                Available Kudos
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Give a Coworker a Great Kudos!
      </Typography>
      <Box component="form" onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <FormControl sx={{ minWidth: 450 }}>
            <InputLabel>Coworker</InputLabel>
            <Select
              value={coworker}
              label="Coworker"
              onChange={handleCoworkerChange}
              autoWidth
            >
              {coworkers.map((coworkerObj) => (
                <MenuItem value={coworkerObj.id} key={coworkerObj.id}>
                  {`${coworkerObj.first_name} ${coworkerObj.last_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{ minWidth: 450 }}
                multiline
                rows={4}
                value={message}
                onChange={handleMessageChange}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Give Kudos
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Kudos!"
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">Kudos Given!</Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        message="Not Enough Kudos for this week :C"
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">Not Enough Kudos for this week :C</Alert>
      </Snackbar>
    </>
  );
}
