import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  Movie,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import genreIcons from "../../assets/genres";
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from "../../services/TMDB";
import useStyles from "./styles";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import MovieList from "../MovieList/MovieList";
import { userSelector } from '../../features/auth'

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { user } = useSelector(userSelector)
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetMovieQuery({ id });
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ movie_id: id })
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchlistMovies } = useGetListQuery({ listName: 'favorite', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data])

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data])


  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong Go back</Link>
      </Box>
    );
  }

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted
    });
    setIsMovieWatchlisted((prev) => !prev);
  };


  return (
    <Grid>
      <Grid className={classes.containerSpaceAround}>
        <Grid item sm={12} lg={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={data.vote_average / 2} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  marginLeft: "10px",
                }}
              >
                {data.vote_average} /10
              </Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min{" "}
              {data?.spoken_languages.length > 0
                ? `/${data?.spoken_languages[0].name}`
                : ""}
            </Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre, i) => (
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                  alt={genre.name}
                />
                <Typography color="textprimary" variant="subtitle1" style={{ textDecoration: "none" }}>
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
            OverView
          </Typography>
          <Typography style={{ marginBottom: "2rem" }}>
            {data?.overview}
          </Typography>
          <Typography varient="h5" gutterBottom>
            Top Cast
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits.cast
                .map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid
                        key={i}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          className={classes.castImage}
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                        />
                        <Typography color="textPrimary">
                          {character.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {character.character.split("/")[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .slice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: "2rem" }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button
                    target="blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<Movie />}
                  >
                    IMDB
                  </Button>
                  <Button onClick={() => { setOpen(true) }} href="#" endIcon={<Theaters />}>
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>{isMovieFavorited ? 'Unfavorite' : 'Favorite'}</Button>
                  <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>Watchlist</Button>
                  <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                    <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: "none" }}>
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations?.results?.length ?
          (<MovieList movies={recommendations} numberOfMovies={12} />)
          :
          (<Box>"Sorry nothing was found"</Box>)
        }
      </Box>
      <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
        {data?.videos?.results?.length > 0 && (
          <iframe autoPlay className={classes.video} frameBorder="0" title="Trailer" src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} allow="autoPlay" />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
