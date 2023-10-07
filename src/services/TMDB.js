import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbapiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbapiKey}`,
    }),
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbapiKey}`;
        }
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbapiKey}`;
        }
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbapiKey}`;
        }
        return `movie/popular?page=${page}&api_key=${tmdbapiKey}`;
      },
    }),
    getMovie: builder.query({
      query: ({ id }) => {

        return `movie/${id}?append_to_response=videos,credits&api_key=${tmdbapiKey}`
      }
    }),
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => {
        return `/account/${accountId}/${listName}?api_key=${tmdbapiKey}&session_id=${sessionId}&page=${page}`
      }
    }),
    getRecommendations: builder.query({
      query: ({ movie_id }) => {
        return `movie/${movie_id}/recommendations?api_key=${tmdbapiKey}`

      }
    }),
    getActors: builder.query({
      query: ({ id }) => {
        return `person/${id}?api_key=${tmdbapiKey}`
      }
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbapiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorsQuery, useGetMoviesByActorIdQuery, useGetListQuery } = tmdbApi;
