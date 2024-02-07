import { Fragment } from "react";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardComponent from "../components/CardComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import EmbeddedMap from "../components/EmbeddedMap";
import LoginContext from "../store/loginContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
const AboutMyPage = () => {
  const [cardData, setCardData] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCardData([data]);
      })
      .catch((err) => {});
  }, [id, dataFromServer]);
  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex !== -1) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
      if (data.likes.includes(login._id)) {
        toast.success("Card liked successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Card unliked successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {}
  };
  const handleDeleteCard = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (userConfirmed) {
      try {
        await axios.delete("/cards/" + id);
        setDataFromServer((currentDataFromServer) =>
          currentDataFromServer.filter((card) => card._id !== id)
        );
        toast.success("Card deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("you can not deleted !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
    }
  };
  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        mt: "10px",
      }}
    >
      <Fragment>
        <h1 className="h1">About the card </h1>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          {cardData.map((item, index) => (
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              sm={6}
              sx={{ margin: "10px", justifyContent: "center" }}
              key={"carsCard" + index}
            >
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                address={item.address.city}
                cardNumber={item.bizNumber}
                liked={item.likes.includes(login._id)}
                onCard={handleAboutCard}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onLike={handleLikeCard}
              />
            </Grid>
          ))}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {cardData.length > 0 && (
              <EmbeddedMap city={cardData[0].address.city} />
            )}
          </Grid>
        </Grid>

        <div>
          <p className="h2">More information about the card</p>
          <Typography component="span" fontWeight={700}>
            description:
          </Typography>{" "}
          {cardData && cardData[0] && cardData[0].description
            ? cardData[0].description
            : "no description"}{" "}
          <Typography component="span" fontWeight={700}>
            subtitle:
          </Typography>{" "}
          {cardData && cardData[0] && cardData[0].subtitle
            ? cardData[0].subtitle
            : "no subtitle"}{" "}
          <Typography component="span" fontWeight={700}>
            country:
          </Typography>{" "}
          {cardData && cardData[0] && cardData[0].country
            ? cardData[0].country
            : "no country" + " "}{" "}
          <Typography component="span" fontWeight={700}>
            web:
          </Typography>{" "}
          {cardData && cardData[0] && cardData[0].web
            ? cardData[0].web
            : "no web"}
        </div>
      </Fragment>
    </Box>
  );
};
export default AboutMyPage;
