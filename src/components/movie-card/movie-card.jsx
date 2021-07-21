import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./movie-card.scss";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const { selectedView } = state;
  return { selectedView};
}

class MovieCard extends React.Component {
  render() {
    //set the props to variables
    const { movie, selectedView} = this.props

    //These variables will be used to set class to chnage the card display
    let selectedStyle1;
    let selectedStyle2;
    let selectedStyle3;

    //If the user wants the horizontal cards, set the variables to horizontal values
    if(selectedView === "2") {
      selectedStyle1 = "horizontal-card";
      selectedStyle2 = "horizontal-image-size";
      selectedStyle3 = "horizontal-body";
    }

    //This sets the variables to the default vertical values
    else {
      selectedStyle1 = "vertical-card";
      selectedStyle2 = "vertical-image-size";
      selectedStyle3 = "vertical-body";
    }

    return (
      <Link to={`/movies/${movie._id}`}>
        <Card bsPrefix="card-styling" className={selectedStyle1}>
          <Card.Img 
              alt={`${movie} picture`}
              className={`movie-card-img ${selectedStyle2}`}
              varient="top" 
              src={movie.ImagePath} />
          <Card.Body bsPrefix="body-sizing" className={selectedStyle3}>
            <Card.Title bsPrefix="overflow-handle">{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
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
  selectedView: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(MovieCard);