import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Image(props) {
  return (
    <Card>
      <CardMedia
        component={
          props.mediaType === "image"
            ? "img"
            : props.mediaType === "video"
            ? "iframe"
            : "img"
        }
        sx={{ height: "auto", minHeight: "300px" }}
        image={props.imageUrl}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.copyright ? `©${props.copyright}` : null}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => props.toggleFavorite(props.title)}
          aria-label="add to favorites"
        >
          <FavoriteIcon sx={{ color: props.favorite ? red[500] : "grey" }} />
        </IconButton>
      </CardActions>
      <Typography variant="body2" color="text.primary">
        {props.content}
      </Typography>
    </Card>
  );
}

export default Image;
