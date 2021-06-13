import React from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: "Inception", Description: "desc 1...", ImagePath: "..."},
        {_id: 2, Title: "The Shawshank Redemption", Description: "desc2...", ImagePath: "..."},
        {_id: 3, Title: "Gladiator", Description: "desc3...", ImagePath: "..."}
      ],
      selectedMovie: null
    };
  }

  render() {
    const movies = this.state.movies;
    if (selectedMovie) {
      return <MovieView movie={selectedMovie} />;
    }

    else if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>
    } else { 
      return (
      <div className="main-view">
        <button onClcik={() => {alert("nice")}}>Click me!</button>
        {movies.map((movie) => {
          return <MovieCard key={movie._id} movieData={movie}/>;
        })}
      </div>
      );
    }
  }
}