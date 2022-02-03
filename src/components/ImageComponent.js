import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Image(props) {
  const [expanded, setExpand] = useState(false);
  const toggleExpand = () => setExpand(!expanded);
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
        <ExpandMore
          expand={expanded}
          onClick={toggleExpand}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon></ExpandMoreIcon>{" "}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color="text.primary">
            {props.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Image;
