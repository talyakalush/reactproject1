import React, { useState, useEffect } from "react";
import axios from "axios";
import searchContext from "../store/searchContext";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
const Sandbox = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalUsersData, setOriginalUsersData] = useState([]);
  const { search } = useContext(searchContext);
  const [UsersToShow, setUsersToShow] = useState(4);

  useEffect(() => {
    axios
      .get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
      .then(({ data }) => {
        setDataFromServer(data);
        setOriginalUsersData(data);
      })
      .catch((err) => {});
  }, [UsersToShow]);

  useEffect(() => {
    let filterUsers;
    if (search) {
      filterUsers = originalUsersData.filter((item) =>
        item.name.first.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filterUsers = originalUsersData;
    }
    setDataFromServer(filterUsers);
  }, [search, UsersToShow]);

  const handleLoadMore = () => {
    setUsersToShow((prev) => prev + 4);
  };

  return (
    <div>
      <h1 className="h1">SandBox</h1>
      <h2 className="h2">
        In this page you show the users details of the website
      </h2>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table
          sx={{ minWidth: 650, backgroundColor: "antiquewhite" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <div>Name</div>
              </TableCell>
              <TableCell align="right">
                <span>Email</span>
              </TableCell>
              <TableCell align="right">
                <div>Address</div>
              </TableCell>
              <TableCell align="right">
                <div>Phone</div>
              </TableCell>
              <TableCell align="right">
                <div>Is Business</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFromServer.slice(0, UsersToShow).map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.name.first}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.address.city}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">
                  {user.isBusiness.toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            onClick={handleLoadMore}
            sx={{
              bgcolor: "#d7ccc8",
              color: "gray",
              borderRadius: "10px",
              mt: 3,
            }}
          >
            Load More
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Sandbox;
