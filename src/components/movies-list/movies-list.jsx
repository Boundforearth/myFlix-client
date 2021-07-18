import React from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const {movies, visibilityFilter} = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />

  return (
    <>
      <Col md={12} style={{margin: "1em"}}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map(m => (
        <Col lg={3} md={4} sm={6} bsPrefix="all-col-sizing" key={m._id}>
        <MovieCard selectedView={selectedView} movieData={m} />
      </Col>
      ))}
    </>
  )
}

export default connect(mapStateToProps)(MoviesList);