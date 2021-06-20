import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view"
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }


  componentDidMount() {
    axios.get("https://myflix-57495.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const movies = this.state.movies;
    const selectedMovie = this.state.selectedMovie;

    if(!user) {return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />};

    if (movies.length === 0) {
      return <div className="main-view">apples</div>
    }

    if(selectedMovie) {
      return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie);}} />
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