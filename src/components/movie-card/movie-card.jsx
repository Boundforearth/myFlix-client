import React from "react";

export class MovieCard extends React.Component {
  render() {
    const movie = this.props.movieData
    const onMovieClick = this.props.onMovieClick
    return <div className="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>
  }
}