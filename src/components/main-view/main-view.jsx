import React from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: "Inception", Description: "desc 1...", ImagePath: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"},
        {_id: 2, Title: "The Shawshank Redemption", Description: "desc2...", ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"},
        {_id: 3, Title: "Gladiator", Description: "desc3...", ImagePath: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png"}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }

  render() {
    const movies = this.state.movies;
    const selectedMovie = this.state.selectedMovie;
    if (selectedMovie) {
      return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie);}}/>;
    }

    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>
    }
    return (
      <div className="main-view">
        {movies.map((movie) => {
           return (<MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { 
             this.setSelectedMovie(movie)
            }}/>);
        })}
      </div>
    );
  }
}