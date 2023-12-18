import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonIcon from "@mui/icons-material/Person";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { message } from "antd";

const CancellationList = () => {
  const dataFetch = () => {};
  const { data, loading, error } = useFetch(`http://localhost:8081/api/cancel`);

  const handleDelete = async (id) => {
    // Implement your delete logic here
    await axios.delete(`http://localhost:8081/api/cancel/${id}`);
    message.success("Deleted successfully");
    window.location.reload();
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container maxWidth="md" sx={{ marginTop: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Cancellation List
          </Typography>

          <List>
            {data.map((cancellation, index) => (
              <React.Fragment key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Typography variant="h6" gutterBottom>
                      <PersonIcon sx={{ fontSize: 30, marginRight: 1 }} />
                      {cancellation.userName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      <HotelIcon sx={{ fontSize: 20, marginRight: 1 }} />
                      {cancellation.days} days at {cancellation.hotelName}
                    </Typography>
                  </div>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(cancellation._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
                <Divider sx={{ margin: "10px 0" }} />
              </React.Fragment>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
};

export default CancellationList;
