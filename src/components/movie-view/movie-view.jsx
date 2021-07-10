import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss"
import axios from "axios";
let addOrDeleteButton
export class MovieView extends React.Component {

  updateFavorite (value, movie) {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    if (value === true) {
      axios.delete(`https://myflix-57495.herokuapp.com/users/${user}/mylist/${movie}`,
      {
        headers: {Authorization: `Bearer ${token}`}})
      .then(() => {
        this.props.deleteFavorite(movie);
        alert("The movie has been deleted from your favorites");
      })
      .catch((e) => {
        console.log(e);
      })
    }
    else {axios.post(`https://myflix-57495.herokuapp.com/users/${user}/mylist/${movie}`, "", 
    {headers: {Authorization: `Bearer ${token}`}})
    .then((data) => {
      this.props.addFavorite(movie);
      alert("This movie has been added to your favorites!");
    })
    .catch((e) => {
      console.log(e);
    });
  }
}
  checkFavorites(movie, favorites) {
    let favoritedMovie = favorites.find(favorite => favorite === movie);
    addOrDeleteButton = null;
    if(favoritedMovie) {
      let value = true;
      addOrDeleteButton = <Button variant="secondary" onClick={() => this.updateFavorite(value, movie)}>Unfavorite Movie</Button>
    }
    else {
      let value = false
      addOrDeleteButton = <Button variant="secondary" onClick={() => this.updateFavorite(value, movie)}>Favorite Movie</Button>
    }
  }
     


  render() {
    const { movie, onBackClick, favorites} = this.props
    this.checkFavorites(movie._id, favorites);
    
    return(
      <Card bsPrefix="movie-view-width">
        <Card.Img 
          variant="top"
          id="movie-view-image"
          src={movie.ImagePath}
          />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><Link to={`/genres/${movie.Genre.Name}`}>Genre: {movie.Genre.Name}</Link></Card.Subtitle>
          <Card.Text><Link to={`/directors/${movie.Director.Name}`}>Director: {movie.Director.Name}</Link></Card.Text>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <div className="button-group">
          <Button id="movie-view-button" variant="secondary" onClick={() => onBackClick()}>Back</Button>
          {addOrDeleteButton}
        </div>
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
}