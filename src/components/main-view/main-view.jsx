import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavView } from "../nav-view/nav-view";

import "./main-view.scss";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
      selectedView: 1
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

  setSelectedView(view) {
    this.setState({
      selectedView: view
    })
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
    const selectedView = this.state.selectedView

   if(!user && (registered === true)) {return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} 
    notRegistered={() => {
      this.toggleRegisterView();
      }} />};

    if(registered === false) {
      return <RegistrationView onRegistration = {() => this.toggleRegisterView()} />;
    }

    if (movies.length === 0) {
      return <div className="main-view"></div>
    }

    if(selectedMovie) {
      return (
        <div>
          <NavView changeView={(view) => {this.setSelectedView(view)}} username={user}/>
          <Row className="justify-content-md-center">
            <Col md={6} xs={8}>
              <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie);}} />
            </Col>
          </Row>
        </div>
      )
    }
    
    return (
      <div>
        <NavView changeView={(view) => {this.setSelectedView(view)}} username={user}/>
        <Row className="main-view justify-content-md-center">
          {movies.map((movie) => {
            return (
                <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={movie._id}>
                  <MovieCard selectedView={selectedView} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}