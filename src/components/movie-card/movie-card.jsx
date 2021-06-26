import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const movie = this.props.movieData;
    const onMovieClick = this.props.onMovieClick;
    const selectedView = this.props.selectedView;
    let selectedStyle1;
    let selectedStyle2;
    let selectedStyle3;

    if(selectedView === "2") {
      selectedStyle1 = "horizontal-card";
      selectedStyle2 = "horizontal-image-size";
      selectedStyle3 = "horizontal-body";
    }

    else {
      selectedStyle1 = "vertical-card";
      selectedStyle2 = "vertical-image-size";
      selectedStyle3 = "vertical-body";
    }

    return (
      <Card bsPrefix="card-styling" className={selectedStyle1}>
        <Card.Img 
            alt={`${movie} picture`}
            className={`movie-card-img ${selectedStyle2}`}
            varient="top" 
            src={movie.ImagePath} />
        <Card.Body onClick={() => onMovieClick(movie)} bsPrefix="body-sizing" className={selectedStyle3}>
          <Card.Title bsPrefix="overflow-handle">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    );
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