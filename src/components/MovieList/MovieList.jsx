import React from "react";
import { Grid } from "@mui/material";

import useStyles from "./styles";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie movie={movie} key={i} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
