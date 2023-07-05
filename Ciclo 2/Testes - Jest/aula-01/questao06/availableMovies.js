function availableMovies(movies, age) {
  const allowedMovies = movies.filter((movie) => {
    return movie.minAge < age;
  });

  return allowedMovies;
}
module.exports = availableMovies;
