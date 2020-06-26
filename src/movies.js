/* eslint no-restricted-globals: 'off' */

// ITERATION 1: Ordering by year - Order by year, ascending

function orderByYear(arrOfMovies) {
  const chronoOrderedMovies = arrOfMovies.slice();
  chronoOrderedMovies.sort(function (a, b) {
    const yearA = a.year;
    const yearB = b.year;

    let comparison = 0;
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    } else if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
  });
  return chronoOrderedMovies;
}

// ITERATION 2. How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(arr) {
  const spielbergMovies = arr.filter(function (movie) {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });
  return spielbergMovies.length;
}

// ITERATION 3: Alphabetic Order by title (only of the first 20 titles)

function orderAlphabetically(movieArray) {
  const movieTitles = movieArray.map(function (movie) {
    return movie.title;
  });
  let top20 = movieTitles.sort().slice(0, 20);
  return top20;
}

// ITERATION 4: Get the average of all rates with 2 decimals

function ratesAverage(moviesArr) {
  if (moviesArr.length === 0) {
    return 0;
  } else {
    const totalRating = moviesArr.reduce(function (sumRates, filmRate) {
      if (typeof filmRate.rate !== "number") {
        filmRate.rate = 0;
      }
      return sumRates + filmRate.rate;
    }, 0);

    const avgRating = totalRating / moviesArr.length;
    return parseFloat(avgRating.toFixed(2));
  }
}

// ITERATION 5: Get the average of Drama Movies

function dramaMoviesRate(moviesArr) {
  if (moviesArr.length === 0) {
    return 0;
  } else {
    const dramaMovies = moviesArr.filter(function (movie) {
      return movie.genre.includes("Drama");
    });
    if (dramaMovies.length === 0) {
      return 0;
    } else {
      const totalRating = dramaMovies.reduce(function (sumRates, filmRate) {
        return sumRates + filmRate.rate;
      }, 0);

      const avgRating = totalRating / dramaMovies.length;
      return Math.round((totalRating / dramaMovies.length) * 100) / 100;
      //ALTERNATIVELY:
      //return Number(avgRating.toFixed(2));
    }
  }
}

// ITERATION 6: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(moviesArr) {
  const newMoviesArr = JSON.parse(JSON.stringify(moviesArr));

  newMoviesArr.map((movie) => {
    let strToNumMins = 0;
    let hoursToMins = 0;

    if (movie.duration.includes("h")) {
      hoursToMins = Number(movie.duration.charAt(0)) * 60;
      //OR if a movie length is > 9hrs and therefore takes two indices
      //Number(movie.duration.slice(0, movie.duration.indexOf('h'))) * 60;
    }
    if (movie.duration.includes("min")) {
      strToNumMins = Number(
        movie.duration.slice(
          movie.duration.indexOf(" ") + 1,
          movie.duration.indexOf("m")
        )
      );
    }

    movie.duration = hoursToMins + strToNumMins;
  });

  return newMoviesArr;
}

// BONUS ITERATION: Which year had the highest average rating for all movies

const bestYearAvg = (ar) => {
  if (!ar.length) return null;
  const yearsWithoutDupes = [...new Set(ar.map((movie) => movie.year))];
  const averageRatingsPerYear = yearsWithoutDupes.map((year) => ({
    year,
    rate: ratesAverage(ar.filter((movie) => movie.year === year)),
  }));
  const best = averageRatingsPerYear.sort((a, b) =>
    b.rate - a.rate === 0 ? a.year - b.year : b.rate - a.rate
  )[0];

  return `The best year was ${best.year} with an average rate of ${best.rate}`;
};

function bestYearAvg2(movies) {
  if (!movies.length) return null;

  const best = movies.reduce(
    function (best, movie) {
      let average = ratesAverage(
        movies.filter(function (m) {
          return m.year === movie.year;
        })
      );
      // console.log(movie.year, average, best.rate);

      if (
        average > best.rate ||
        (average === best.rate && movie.year < best.year)
      ) {
        best.year = movie.year;
        best.rate = average;
        // console.log(best);
      }
      return best;
    },
    {
      year: null,
      rate: null,
    }
  );

  return `The best year was ${best.year} with an average rate of ${best.rate}`;
}

console.log(bestYearAvg2(movies));
