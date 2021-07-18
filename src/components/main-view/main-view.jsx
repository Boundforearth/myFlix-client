import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

/*
#1 The rest of components import statements but without the MovieCard's 
because it will be imported and used in the MoviesList component rather
than in here
*/


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

// Removed export?
class MainView extends React.Component {

  //set the states
  constructor() {
    super();
    this.state = {
      //movies removed
      user: null,
      currentUserFavorites: [],
      //Default view will be the vertical cards with images at the top
      // 1 = vertical cards
      // 2 = horizontal cards
      selectedView: 1,
    };
  }

  //used to add a new movie to the favorites list
  addFavorite(movie) {
    this.setState({
      currentUserFavorites: [...this.state.currentUserFavorites, movie]
    })
  }

  //filters out the selected movie and removes it from the state
  deleteFavorite(movie) {
    this.setState({
      currentUserFavorites: this.state.currentUserFavorites.filter((m) => {return m !== movie})
    })
  }

  //get the movie data when the component mounts
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUserFavorites(accessToken)
    }
  }


   getMovies(token) {
    axios.get("https://myflix-57495.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      //Instead of this.setState, this.props.setMovies.  Actions and all
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
      this.setState({
        currentUserFavorites: data.data.Favorites
      })
    })
    .catch((e) => {
      console.log(e);
    })
  }

  //change the cards between horizontal and vertical
  setSelectedView(view) {
    this.setState({
      selectedView: view
    })
  }

  //Use to set the movies state
  setMovies(array) {
    this.setState({
      movies: array
    })
  }

  //change the state of the selected movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  // use to set the user state
  setUser(user) {
    this.setState({
      user: user
    })
  }

  //set the state of the user to who is actually logged in and grab their list of favorite movies
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
      currentUserFavorites: authData.user.Favorites
    });
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
    this.setState({
      user: null,
      selectedView: 1,
      currentUserFavorites: []
    });

  }

  render() {
    //define all the states
    const { user, selectedView, currentUserFavorites } = this.state;
    let { movies } = this.props;

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
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            //assuming there are movies, map each movie to its own MovieCard
            if (!movies.length) return <div className="main-view" />;
            return <MoviesList movies={movies}/>
            //movies.map(m => (
              //<Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
                //<MovieCard selectedView={selectedView} movieData={m} />
              //</Col>
           // ))
            
            }} 
            />
        </Row>

        <Row className="main-view justify-content-md-center">
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
              <MovieView addFavorite={(movie) => this.addFavorite(movie)} deleteFavorite={(movie) => this.deleteFavorite(movie)} favorites={currentUserFavorites} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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
                movies={movies.filter(m => m.Director.Name === match.params.director)}
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
            if (!currentUserFavorites.length) return <h3>Your Favorites List Is Empty</h3>

            //Create a list of all the movies with all the information based on the users favorites
            //currentUserFavorites is only ID's, we need all the movie info
            let favoriteMovies = [];
              for(let i = 0; i < movies.length; i++) {
                for(let j = 0; j < currentUserFavorites.length; j++) {
                  if(movies[i]._id === currentUserFavorites[j]) {
                    favoriteMovies.push(movies[i]);
                    break;
                  }
                }
              }
              //map the new list of movies to their own cards called FavoritesView
            return favoriteMovies.map(m => (
              <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
                <FavoritesView setMovies={(array) => this.setMovies(array)} user={user} selectedView={selectedView} movieData={m} favorites={currentUserFavorites}/>
              </Col>
            ))
            }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return{ movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);