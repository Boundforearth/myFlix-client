import React from "react";

export class MovieView extends React.Component {
  
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback)
  }

  render() {
    const movie = this.props.movie;
    const onBackClick = this.props.onBackClick;
    return(
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <button onClick={() => {onBackClick(null);}}>Back</button>
    </div>
    );
  }
}