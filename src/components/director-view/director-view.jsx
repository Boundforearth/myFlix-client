import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import "./director-view.scss";

export class DirectorView extends React.Component {
render() {
  const movie = this.props.movie;
  const onBackClick = this.props.onBackClick;
  return(
    <Card bsPrefix="movie-view-width">
      <Card.Body>
        <Card.Title>{movie.Director.Name}</Card.Title>
        <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
        <Card.Text>{movie.Director.Birth}</Card.Text>
        <Card.Text>{movie.Director.Death}</Card.Text>
      </Card.Body>
      <Button id="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
    </Card>
  );
}
}