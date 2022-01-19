import React, { useEffect, useState } from "react";
import Image from "./ImageComponent";
import Header from "./HeaderComponent";
import { Grid, Container } from "@mui/material";

// const favoritesCookie = (favorites) => {
//     document.cookie = `favorites=${favorites}; expires=`
// }

function Main(props) {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const toggleFavorite = (title) => {
    console.log(favorites.includes(title));
    if (favorites.includes(title)) {
      const newFavorites = favorites.filter((value) => value !== title);
      setFavorites([...newFavorites]);
      //favoritesCookie
    } else {
      setFavorites([title, ...favorites]);
      //favoritesCookie
    }
    console.log(typeof favorites, favorites);
  };
  //   useEffect(() => {
  //       const cookies = document.cookie;
  //       if (cookies has my cookie) {
  //           setFavorites(my cookie)
  //       }
  //   })
  useEffect(() => {
    const query = dateRange
      ? `${dateRange.start} && ${dateRange.end}`
      : "&&count=10";
    const apodRequest = new Request(
      "https://api.nasa.gov/planetary/apod?api_key=tjbxWIQU1FLhr28offHGq7lV0dMlyqQkAn7L7CLr" +
        query
    );
    fetch(apodRequest)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setImages(result);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={12} md={6}>
              <Image
                imageUrl={image.url}
                title={image.title}
                date={image.date}
                content={image.explanation}
                toggleFavorite={toggleFavorite}
                favorite={favorites.includes(image.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Main;
