import { useState } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import TextInputComponent from "../components/TextInputComponent";
import validateSchema from "../validation/cardValidation";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import ToServer from "./EditCardPage/ToServer";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

const CreateCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();

  let keysArray = Object.keys(inputsValue);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });

    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        ToServer(inputsValue)
      )

      .then(({ data }) => {
        navigate(ROUTES.MYCARD);
        toast.success(" you successfully created a card", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("🦄 Try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "rgb(237, 225, 227)",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#5d4037" }}>
        <CreateIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create your card
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={errors[keyName] === "" ? true : false}
            />
          ))}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            // marginTop: 7,
            backgroundColor: "#d7ccc8",
            color: "gray",
            width: "85%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sx={{ mt: 2 }}
          disabled={Object.keys(errors).length > 0}
          onClick={handleCreateCard}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};
export default CreateCardPage;
