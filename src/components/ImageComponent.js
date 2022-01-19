import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Image(props) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={props.imageUrl}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.date}
        </Typography>
      </CardContent>
      <IconButton onClick={() => props.toggleFavorite(props.title)}>
        <FavoriteIcon color={props.favorite ? "primary" : "secondary"} />
      </IconButton>
      <Typography variant="body2" color="text.primary">
        {props.content}
      </Typography>
    </Card>
  );
}

export default Image;
