import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

//import other views to be used
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavView } from "../nav-view/nav-view";

import "./main-view.scss";

export class MainView extends React.Component {

  //set the states
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      //Assume already registered.  
      registered: true,
      //Default view will be the vertical cards with images at the top
      // 1 = vertical cards
      // 2 = horizontal cards
      selectedView: 1
    };
  }

  //get the movie data when the component mounts
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

  getMovies(token) {
    axios.get("https://myflix-57495.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  //change the cards between horizontal and vertical
  setSelectedView(view) {
    this.setState({
      selectedView: view
    })
  }

  //change the state of the selected movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  //set the state of the user to who is actually logged in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorgae.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // If a user is not registered, set registered state to false to bring up the registration page
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
    //define all the states
    const movies = this.state.movies;
    const selectedMovie = this.state.selectedMovie;
    const user = this.state.user
    const registered = this.state.registered;
    const selectedView = this.state.selectedView;
    //declare a variable that will be used to set an id for the <Row> component.  This will set the css to change the view
    let selectedViewFlex;

    //If statements that looks at the view state and sets an id that will changes the css based on that
    if(selectedView === "2") {
      selectedViewFlex = "flex-column";
    }
    if(selectedView === "1"){
      selectedViewFlex = "flex-row"
    }

    //If the user state is null and they are registered, bring up the login page
   if(!user && (registered === true)) {return <LoginView onLoggedIn={(authData) => this.onLoggedIn(authData)} 
    notRegistered={() => {
      this.toggleRegisterView();
      }} />};

      //if the registered state is changed to false, bring up the registration page
    if(registered === false) {
      return <RegistrationView onRegistration = {() => this.toggleRegisterView()} />;
    }

    //If the movie state is empty or there is an error accessing the database, this if runs
    if (movies.length === 0) {
      return <div className="main-view"></div>
    }

    //If a movie has been selected from out of the movie cards, this runs to display that movies' information
    if(selectedMovie) {
      return (
        <div>
          <NavView selectedView={selectedView} changeView={(view) => {this.setSelectedView(view)}} username={user}/>
          <Row className="justify-content-md-center">
            <Col md={6} xs={8}>
              <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie);}} />
            </Col>
          </Row>
        </div>
      )
    }
    
    //If all other if statements don't run, the movie card view is brought up
    return (
      <div>
        <NavView selectedView={selectedView} changeView={(view) => {this.setSelectedView(view)}} username={user}/>
        <Row className="main-view justify-content-md-center" id={selectedViewFlex}>
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