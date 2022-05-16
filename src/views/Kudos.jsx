import { useState, useEffect } from "react";
import CustomAppBar from "../components/AppBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_BACKEND, axios as http } from "../apiService";

const Kudos = () => {
  const [kudos, setKudos] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    organization: { name: "" },
  });

  useEffect(() => {
    (async () => {
      const kudosData = await http.get(API_BACKEND + "api/v1/kudos/received/");
      setKudos(kudosData.data);
    })();

    (async () => {
      const user = await http.get(API_BACKEND + "api/v1/users/profile/");
      setUser(user.data);
    })();
  }, []);

  return (
    <>
      <CustomAppBar user={user} />
      <Box sx={{ marginTop: 5, padding: 10 }}>
        {kudos.map((kudo) => (
          <Accordion key={kudo.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ marginRight: 2 }}
                >{`${kudo.from_user.first_name} ${kudo.from_user.last_name}`}</Typography>
                <Typography>{`${kudo.date}`}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{kudo.message}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default Kudos;
