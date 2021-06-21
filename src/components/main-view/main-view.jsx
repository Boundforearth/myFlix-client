import React from "react";
import axios from "axios";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
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

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  toggleRegisterView() {
    if(this.state.registered === true) {
      this.setState({
        registered: false
      });
    }
    else this.setState({
      registered: true
    });
  }

  render() {
    const movies = this.state.movies;
    const selectedMovie = this.state.selectedMovie;
    const user = this.state.user
    const registered = this.state.registered;

   if(!user && (registered === true)) {return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} 
    notRegistered={() => {
      this.toggleRegisterView();
      }} />};

    if(registered === false) {
      return <RegistrationView onRegistration = {() => this.toggleRegisterView()} />;
    }

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