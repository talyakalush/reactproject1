import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import LoginContext from "../../store/loginContext";
import searchContext from "../../store/searchContext";
import normalizeHome from "./normalizeHome";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const { search } = useContext(searchContext);
  const { login } = useContext(LoginContext);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(normalizeHome(data));
      })
      .catch((err) => {});
  }, []);
  let dataFromServerFiltered = normalizeHome(
    dataFromServer,
    login ? login._id : undefined
  );
  if (search) {
    dataFromServerFiltered = dataFromServerFiltered?.filter((item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + 4);
  };

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
    if (dataFromServer.user_id == login._id) {
      toast.error("You cannot delete the card, you did not create it!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

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
    <div>
      <h1 className="h1">Home Page</h1>
      <h2 className="h2">Here you can find all the cards</h2>
      <Grid container spacing={2}>
        {dataFromServerFiltered.slice(0, cardsToShow).map((item, index) => (
          <Grid item lg={3} md={4} xs={12} sm={6} key={"carsCard" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address.city}
              cardNumber={item.bizNumber}
              liked={item.liked}
              onCard={handleAboutCard}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
              onLike={handleLikeCard}
            />
          </Grid>
        ))}
      </Grid>

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
  );
};

export default HomePage;
