import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const genre = this.props.genre;
    const onBackClick = this.props.onBackClick;
    return(
      <Card bsPrefix="movie-view-width">
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
        </Card.Body>
        <Button id="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
      </Card>
    );
  }
}