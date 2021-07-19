import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { setMovies, setUser, setFavorites, setView } from '../../actions/actions';

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/


//import other views to be used
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import MoviesList from '../movies-list/movies-list';
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import { NavView } from "../nav-view/nav-view";

import "./main-view.scss";

class MainView extends React.Component {

  //set the states
  constructor() {
    super();
  }

  //get the movie data when the component mounts
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
        this.props.setUser(localStorage.getItem("user"))
      this.getMovies(accessToken);
      this.getUserFavorites(accessToken)
    }
  }


   getMovies(token) {
    axios.get("https://myflix-57495.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      //Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  getUserFavorites(token) {
    let user = localStorage.getItem("user");
    axios.get(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
    .then((data) => {
        this.props.setFavorites(data.data.Favorites)
    })
    .catch((e) => {
      console.log(e);
    })
  }

  //set the state of the user to who is actually logged in and grab their list of favorite movies
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    this.props.setFavorites(authData.user.Favorites);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    //remove local storage items
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //move to login page
    window.open('/', '_self');
    //reset the states
    this.props.setUser('');
    this.props.currentFavorites([])
    this.props.setView('1');

  }

  render() {
    //define all the states
    let { movies, currentFavorites, user, selectedView} = this.props;

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
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if(!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            //assuming there are movies, map each movie to its own MovieCard
            if (!movies.length) return <div className="main-view" />;
            return  <MoviesList movies={movies}/>;
            }} />
          <Route path="/register" render={() => {
            //if someone is logged in, send them to the home page instead of the register page
            if (user) return <Redirect to="/" />
            return <Col>
            <RegistrationView />
          </Col>
          }} />

          <Route path="/movies/:movieId" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
          </Col>
            if (!movies.length) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/genres/:genre" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
            if (!movies.length) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.genre).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path="/directors/:director" render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
            if (!movies.length) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.director).Director}
                onBackClick={() => history.goBack()} />
            </Col>
          }}/>


          <Route path={`/users/${user}`} render={({match, history}) => {
            if(!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} notRegistered={() => {
    this.toggleRegisterView();
    }}/>
            </Col>
            if (!movies.length) return <div className="main-view" />;
            return <Col md={6} xs={8}>
              <ProfileView setUser={(user) => this.setUser(user)} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }}/>
        </Row>
        <Row className="main-view justify-content-md-center" id={selectedViewFlex}>
          <Route path={`/myfavorites/${user}`} render={({match, history}) => {
            if(!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (!movies.length) return <div className="main-view" />;

            //if the user has no favorite movies, display this
            if (!currentFavorites.length) return <h3>Your Favorites List Is Empty</h3>

            //Create a list of all the movies with all the information based on the users favorites
            //currentUserFavorites is only ID's, we need all the movie info
            let favoriteMovies = [];
              for(let i = 0; i < movies.length; i++) {
                for(let j = 0; j < currentFavorites.length; j++) {
                  if(movies[i]._id === currentFavorites[j]) {
                    favoriteMovies.push(movies[i]);
                    break;
                  }
                }
              }
              //map the new list of movies to their own cards called FavoritesView
            return favoriteMovies.map(m => (
              <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
                <FavoritesView setMovies={(array) => this.setMovies(array)} user={user} selectedView={selectedView} movieData={m} favorites={currentFavorites}/>
              </Col>
            ))
            }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user,
    currentFavorites: state.currentFavorites,
    selectedView: state.selectedView
   }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavorites, setView } )(MainView);