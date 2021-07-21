import React from 'react';
import PropTypes from "prop-types";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter, selectedView } = state;
  return { visibilityFilter, selectedView };
};

function MoviesList({movies, selectedView, visibilityFilter}) {

  let filteredMovies = movies;

  //declare a variable that will be used to set an id for the <Row> component.  This will set the css to change the view
  let selectedViewFlex;

    //If statements that looks at the view state and sets an id that will changes the css based on that
    if(selectedView === "2") {
      selectedViewFlex = "flex-column";
    }
    if(selectedView === "1"){
      selectedViewFlex = "flex-row"
    }

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    <Row  className="justify-content-md-center" id={selectedViewFlex}>
      {filteredMovies.map(m => (
        <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  </>;
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  selectedView: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string
}

export default connect(mapStateToProps)(MoviesList);