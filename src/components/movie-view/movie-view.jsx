import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component {
  
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback)
  }

  render() {
    const movie = this.props.movie;
    const onBackClick = this.props.onBackClick;
    return(
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.Genre.Name}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director </span>
        <span className="value">{movie.Director.Name}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <button onClick={() => {onBackClick(null);}}>Back</button>
    </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  onBackClick: PropTypes.func.isRequired
};