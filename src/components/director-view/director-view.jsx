import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./director-view.scss";

export class DirectorView extends React.Component {
render() {
  const director = this.props.director;
  const onBackClick = this.props.onBackClick;
  return(
    <Card bsPrefix="movie-view-width">
      <Card.Body>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Text>Bio: {director.Bio}</Card.Text>
        <Card.Text>{director.Birth}</Card.Text>
        <Card.Text>{director.Death}</Card.Text>
      </Card.Body>
      <Button id="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
    </Card>
  );
}
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}