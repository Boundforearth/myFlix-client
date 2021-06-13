import React from "react";

export class MovieCard extends React.Component {
  render() {
    const movie = this.props.movieData
    return <div className="movie-card">{movie.Title}</div>
  }
}