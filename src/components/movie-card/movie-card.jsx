import React from "react";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const movie = this.props.movieData
    const onMovieClick = this.props.onMovieClick
    return <div className="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired

  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};