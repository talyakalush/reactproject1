import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { memo } from "react";

const CardComponent = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onDelete,
  onEdit,
  onLike,
  onCard,
}) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
  };
  const handleAboutClick = () => {
    onCard(id);
  };

  return (
    <Card
      square
      raised
      sx={{
        borderRadius: "10px",
        border: "1px solid black",
        "&:hover": {
          background: "#f5f2f5",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt={img.alt}
          height={200}
          onClick={handleAboutClick}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {address.city}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <ModeIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleLikeClick}>
              <FavoriteIcon color={liked ? "error" : "inherit"} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  cardNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onCard: PropTypes.func.isRequired,
};

CardComponent.defaultProps = {
  img: { url: "/assets/imgs/car 1.jpg", alt: "subtitle default" },
  subtitle: "subtitle default",
};

export default memo(CardComponent);
