/* eslint no-restricted-globals: 'off' */

// Iteration 1: Ordering by year - Order by year, ascending (in growing order)
// NB: use sort method, access year in object using movies[i].year

function orderByYear(arrOfMovies) {
  const chronoOrderedMovies = arrOfMovies.slice();
  chronoOrderedMovies.sort(function(a, b) {
    const yearA = a.year;
    const yearB = b.year;

    let comparison = 0;
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    } else if (a.year === b.year) {
      //return chronoOrderedMovies.sort(); //Can't use sort() 'normally' for direct string comparison because I have set it up as number comparison above (?)
      return a.title.localeCompare(b.title);
    } //use localeCompare() for strings instead. localeCompare returns a NEG num (usually -1,  but careful! not so in all browsers) if 'a' occurs before 'b' string, and POS value if b string occurs before A
  });
  return chronoOrderedMovies;
}
//JAN soln:
//return a.title.localeCompare(b.title);

// ITERATION 2. Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct
//Create a howManyMovies() function that receives an array as a parameter and filter 👀 the array
// to return director Steven Spielberg's drama movies Only

//Step 1: use filter method
//Step 2: return the number of items in that array (i.e. array.length)
//Step 3: if array empty return 0; else if only drama movies return 1
//if only spielberg movies return 2 && return 4 ??? don't understand what Jasmine instructions mean here...

//LOGIC CHAIN= movies ARRAY > film OBJECTS > director property (STRING) & genre property (ARRAY)

function howManyMovies(arr) {
  const spielbergMovies = arr.filter(function(movie) {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });
  return spielbergMovies.length;
}

// Iteration 3: Alphabetic Order by title (only of the first 20 titles)
// Create a orderAlphabetically() function, that receives an array and returns
//  an array of first 20 titles, alphabetically ordered. Return only the title of
//  each movie, and if the array you receive has less than 20 movies, return all of them.

//LOGIC CHAIN= movies ARRAY > film OBJECTS > director property (STRING) & genre property (ARRAY)

function orderAlphabetically(movieArray) {
  const alphaOrder = movieArray.map(function(movie) {
    return movie.title;
  });
  let top20 = alphaOrder.sort().slice(0, 20);
  return top20;
}

// Iteration 4: All rates average - Get the average of all rates with 2 decimals
//LOGIC CHAIN= movies ARRAY > film OBJECTS > director property (STRING) & genre property (ARRAY)
//Use .reduce()

//  function ratesAverage(moviesArr) {
//   if (moviesArr.length === 0) {
//     return 0;
//   } else {
//   const totalRating = moviesArr.reduce(function  (sumRates, filmRate) {
//     if (!filmRate.rate) {filmRate.rate = 0};
//     return sumRates + (filmRate.rate);
//     }, 0);
//     const avgRating = Math.round(((totalRating/movies.length)*100)/100);
//     return avgRating;
//   }
// }

//REFACTORING/Attempt after discussion in class wk2d1
function ratesAverage(moviesArr) {
  if (moviesArr.length === 0) {
    return 0;
  } else {
    const totalRating = moviesArr.reduce(function(sumRates, filmRate) {
      if (typeof filmRate.rate !== "number") {
        filmRate.rate = 0;
      }
      return sumRates + filmRate.rate;
    }, 0);

    const avgRating = totalRating / moviesArr.length;
    return parseFloat(avgRating.toFixed(2));
  }
}
//!!!use parsefloat avgRating.toFixed(2) because toFixed changes number to string

// Iteration 5: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(moviesArr) {
  if (moviesArr.length === 0) {
    return 0;
  } else {
    const dramaMovies = moviesArr.filter(function(movie) {
      return movie.genre.includes("Drama");
    });
    if (dramaMovies.length === 0) {
      return 0;
    } else {
      const totalRating = dramaMovies.reduce(function(sumRates, filmRate) {
        return sumRates + filmRate.rate;
      }, 0);

      const avgRating = totalRating / dramaMovies.length;
      return Math.round((totalRating / dramaMovies.length) * 100) / 100;
      //ALTERNATIVELY:
      //return Number(avgRating.toFixed(2));
    }
  }
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
//Create a turnHoursToMinutes() function that receives an array as parameter,
// and with some magic implemented by you - replaces the duration info of each of the
// movies for its equivalent in minutes. ie 1 hour becomes 60

//1. iterate through the array of movies using forEach
//2. target the movie.duration key
//3. if 'h' occurs after then take the number at index 0, make it a number and multiply by 60
//4. if value includes 'min' string then splice string between h and last character and make number

//THIS APPROACH DOESN'T WORK BECAUSE IT ONLY RETURNS THE FIRST VALUE AND THEN STOPS THE LOOP
//function turnHoursToMinutes(moviesArr) {
//   let hoursToMins = '';
//   let strToNumMins = '';
//   moviesArr.forEach(function(movie) {
//     hoursToMins = Number(movie.duration.charAt(0));
//   }); return hoursToMins;
//   }

// // BONUS Iteration: Best yearly rate average - Best yearly rate average
// */
