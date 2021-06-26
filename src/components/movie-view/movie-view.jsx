import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-view.scss"

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
      <Card bsPrefix="movie-view-width">
        <Card.Img 
          variant="top"
          className="movie-view-image"
          src={movie.ImagePath}
          />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Genre: {movie.Genre.Name}</Card.Subtitle>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Button className="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
      </Card>
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