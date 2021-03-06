import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../components/movie';
import "./Home.css";

class Home extends Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const { data: {
      data: {
        movies
      }
    } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies: movies, isLoading: false });
  }
  componentDidMount() {
    this.getMovies();

  }
  render() {
    const { movies, isLoading } = this.state;
    return <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie =>(
            <Movie
              key={movie.id}
              title={movie.title}
              id={movie.id}
              year={movie.year}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            ></Movie>))}
        </div>
      )
      }</section>;
  }
}

export default Home;
