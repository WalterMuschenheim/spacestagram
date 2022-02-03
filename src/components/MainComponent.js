import React, { useEffect, useState } from "react";
import Image from "./ImageComponent";
import Header from "./HeaderComponent";
import { Grid, Container, Skeleton } from "@mui/material";
import { DateTime } from "luxon";

const LOADING_STATUS = (loadingComponent, loadedComponent, errorComponent) => ({
  loading: loadingComponent,
  loaded: loadedComponent,
  error: errorComponent,
});

function LoadingWrapper({
  loadingStatus,
  loadingComponent,
  loadedComponent,
  errorComponent,
}) {
  return LOADING_STATUS(loadingComponent, loadedComponent, errorComponent)[
    loadingStatus
  ];
}

function Main(props) {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectDate, setDate] = useState(null);
  const [dateRange, setDateRange] = useState(1);
  const [loading, setLoadState] = useState({ status: "loading" });

  const toggleFavorite = (title) => {
    console.log(favorites.includes(title));
    if (favorites.includes(title)) {
      const newFavorites = favorites.filter((value) => value !== title);
      setFavorites([...newFavorites]);
    } else {
      setFavorites([title, ...favorites]);
    }
    console.log(typeof favorites, favorites);
  };

  const gridComponent = (
    <Grid container spacing={2} sx={{ marginTop: "80px" }}>
      {images.map((image) => (
        <Grid item xs={12} md={6} key={image.date}>
          <Image
            imageUrl={image.url}
            mediaType={image.media_type}
            title={image.title}
            date={image.date}
            copyright={image.copyright}
            content={image.explanation}
            toggleFavorite={toggleFavorite}
            favorite={favorites.includes(image.title)}
          />
        </Grid>
      ))}
    </Grid>
  );

  useEffect(() => {
    const cookies = document.cookie;
    const cookieObj = cookies
      .split(";")
      .map((string) => string?.split("="))
      ?.reduce((obj, arr) => {
        return {
          ...obj,
          [arr[0]]: arr[1]?.split(","),
        };
      }, {});
    console.log(cookies, cookieObj);
    if (cookieObj?.favorites) {
      setFavorites(cookieObj.favorites);
    }
  }, []);
  useEffect(() => {
    const currentDate = new Date();
    const currentMilis = currentDate.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const oneWeekFromNow = new Date(currentMilis + oneWeek);
    document.cookie = `favorites=${favorites}; expires=${oneWeekFromNow}; SameSite=Lax`;
    console.log("cookie", document.cookie, favorites);
  }, [favorites]);
  useEffect(() => {
    let controller = new AbortController();
    const query = selectDate
      ? `start_date=${
          selectDate > DateTime.now().minus({ days: 1 })
            ? DateTime.now().minus({ days: 1 }).toFormat("yyyy'-'LL'-'dd")
            : selectDate.toFormat("yyyy'-'LL'-'dd")
        }&end_date=${
          selectDate.plus({ weeks: dateRange }) > DateTime.now()
            ? DateTime.now().toFormat("yyyy'-'LL'-'dd")
            : selectDate.plus({ weeks: dateRange }).toFormat("yyyy'-'LL'-'dd")
        }`
      : `start_date=${DateTime.now()
          .minus({ weeks: 1 })
          .toFormat("yyyy'-'LL'-'dd")}`;
    const apodRequest = new Request(
      `https://api.nasa.gov/planetary/apod?${query}&api_key=tjbxWIQU1FLhr28offHGq7lV0dMlyqQkAn7L7CLr`,
      {
        signal: controller.signal,
      }
    );
    console.log(apodRequest, query);
    setLoadState({ status: "loading" });
    fetch(apodRequest)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setLoadState({ status: "loaded" });
        setImages(result);
      })
      .catch((e) => {
        setLoadState({ satus: "error", errMess: e.message });
        console.log(e);
      });
    return () => {
      return () => controller?.abort();
    };
  }, [dateRange, selectDate]);
  useEffect(() => console.log("laoding", loading), [loading]);
  return (
    <>
      <Header
        date={selectDate}
        range={dateRange}
        setDate={setDate}
        setDateRange={setDateRange}
      />
      <Container>
        <LoadingWrapper
          loadingStatus={loading.status}
          loadingComponent={
            <Grid container spacing={2} sx={{ marginTop: "80px" }}>
              {Array.from(new Array(3)).map(() => (
                <Grid item xs={12} md={6}>
                  <Skeleton variant="rectangular" width={"auto"} height={300} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="circular" width={40} height={40} />
                </Grid>
              ))}
            </Grid>
          }
          loadedComponent={gridComponent}
          errorComponent={<div>{loading?.errMess || null}</div>}
        />
      </Container>
    </>
  );
}

export default Main;
