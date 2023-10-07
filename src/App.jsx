import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import useStyles from "./styles";
import useAlan from "./Alan";
import {
  Actors,
  MovieInformation,
  Movies,
  NavBar,
  Profile,
} from "./components";
import { useRef } from "react";

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer}></div>
    </div>
  );
}

export default App;
