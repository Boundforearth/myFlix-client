import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//import other views to be used
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import { NavView } from "../nav-view/nav-view";

import "./main-view.scss";

export class MainView extends React.Component {

  //set the states
  constructor() {
    super();
    this.state = {
      movies: [],
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
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
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
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
      selectedView: 1,
      selectedMovie: null,
      registered: true
    });
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
    //If all other if statements don't run, the movie card view is brought up
    return (
      <Router>
        <NavView selectedView={selectedView} changeView={(view) => {this.setSelectedView(view)}} username={user} onLogout={() => {this.onLoggedOut()}}/>
        <Row className="main-view justify-content-md-center" id={selectedViewFlex}>
          <Route exact path="/" render={() => {
            if(!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
      this.toggleRegisterView();
      }}/>
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
                <MovieCard selectedView={selectedView} movieData={m} />
              </Col>
            ))
            }} />


          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
            <RegistrationView onRegistration = {() => this.toggleRegisterView()}/>
          </Col>
          }} />


          <Route path="/movies/:movieId" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
          </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/genres/:genre" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
          </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <GenreView movie={movies.find(m => m.Genre.Name === match.params.genre).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/directors/:director" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
          </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <DirectorView movie={movies.find(m => m.Director.Name === match.params.director).Director} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/users/:user" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <ProfileView user={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/users/:user/myFavorites" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <FavoritesView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }}/>
        </Row>
      </Router>
    );
  }
}