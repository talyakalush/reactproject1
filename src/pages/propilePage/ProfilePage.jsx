import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextInputComponent from "../../components/TextInputComponent";
import LoginContext from "../../store/loginContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import normalizeFromServer from "../RegisterPage/normalizeFromServer";
import normalizeProfile from "./editProfilePage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { validateSchema1 } from "../../validation/profileValidation";
const ProfilePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalData, setOriginalData] = useState("");
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    phone: "",
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
    first: "",
    last: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { login } = useContext(LoginContext);
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (_id !== login._id) {
      return;
    }
    axios
      .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${_id}`)
      .then(({ data }) => {
        if (data && typeof data === "object") {
          setDataFromServer(data);
          setInputsValue(normalizeFromServer(data));
          setOriginalData(data);
          setErrors({});
        } else {
          setErrors({ server: "Invalid data format" });
        }
      })
      .catch((err) => {
        toast.error("try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(ROUTES.HOME);
      });
  }, [_id, login._id, navigate]);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    const { error } = validateSchema1[e.target.id]({
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
  const handleUpdateChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${_id}`,
        normalizeProfile(inputsValue)
      );
      toast.success("Profile update successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.HOME);
    } catch (error) {}
  };

  let keysArray = Object.keys(inputsValue);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "rgb(237, 225, 227)",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#5d4037" }}>
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile Page
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map(
            (keyName) =>
              keyName !== "isBusiness" &&
              keyName !== "password" && (
                <Grid item xs={12} sm={4} key={"inputs" + keyName}>
                  <TextInputComponent
                    key={"inputs" + keyName}
                    id={keyName}
                    label={keyName}
                    value={inputsValue[keyName] || " "}
                    onChange={handleInputsChange}
                    onBlur={handleInputsBlur}
                    errors={errors[keyName]}
                    required={errors[keyName] === "" ? true : false}
                  />
                </Grid>
              )
          )}
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px" }}
            sx={{
              mb: 2,
              bgcolor: "#d7ccc8",
              color: "gray",
              width: "85%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleUpdateChanges}
            disabled={Object.keys(errors).length > 0}
          >
            Update
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};
export default ProfilePage;
