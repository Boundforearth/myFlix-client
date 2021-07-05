import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const movie = this.props.movie;
    const onBackClick = this.props.onBackClick;
    return(
      <Card>
        <Card.Body>
          <Card.Title>{movie.Genre.Name}</Card.Title>
          <Card.Text>{movie.Genre.Description}</Card.Text>
        </Card.Body>
        <Button id="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
      </Card>
    );
  }
}