const availableMovies = require("./availableMovies");

// Testes para entradas inválidas
describe("Avaliação dos filmes", () => {
  const movies = [
    { title: "Filme 1", minAge: 10 },
    { title: "Filme 2", minAge: 12 },
    { title: "Filme 3", minAge: 16 },
    { title: "Filme 4", minAge: 18 },
  ];

  test("retorna a lista vazia quando nenhum filme é adequado para a idade do usuário", () => {
    const result = availableMovies(movies, 5);

    expect(result).toEqual([]);
  });

  test("retorna apenas filmes que o usuário tem idade suficiente para assistir", () => {
    const result = availableMovies(movies, 17);

    expect(result).toEqual([
      { title: "Filme 1", minAge: 10 },
      { title: "Filme 2", minAge: 12 },
      { title: "Filme 3", minAge: 16 },
    ]);
  });

  test("retorna todos os filmes quando o usuário tem idade superior a 18 anos assistir", () => {
    const result = availableMovies(movies, 20);

    expect(result).toEqual(movies);
  });

  test("retorna a lista vazia de filmes quando a idade do usuário é 0 e não tem filmes disponíveis para ele", () => {
    const result = availableMovies(movies, 0);

    expect(result).toEqual([]);
  });

  test("retorna apenas filmes com idade mínima 0 quando a idade do usuário é 0", () => {
    const moviesWhithAgeZero = [
      { title: "Filme 1", minAge: 0 },
      { title: "Filme 2", minAge: 0 },
      { title: "Filme 3", minAge: 2 },
    ];

    const result = availableMovies(moviesWhithAgeZero, 0);

    expect(result).toEqual([
      { title: "Filme 1", minAge: 0 },
      { title: "Filme 2", minAge: 0 },
    ]);
  });
});
