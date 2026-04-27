"use strict";

//Array med film fra movie.txt. Det er et array med objekter og deres antributter som skrives op key: value
const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "science-fiction",
    year: "2010",
    duration: 2.28,
    img: "img/inception.webp",
    url: "https://www.imdb.com/title/tt1375666/",
  },

  {
    id: 2,
    title: "The Dark Knight",
    genre: "action",
    year: "2008",
    duration: 2.32,
    img: "img/the-dark-knight.webp",
    url: "https://www.imdb.com/title/tt0468569/",
  },

  {
    id: 3,
    title: "Forrest Gump",
    genre: "drama",
    year: "1994",
    duration: 2.22,
    img: "img/forrest-gump.webp",
    url: "https://www.imdb.com/title/tt0109830/",
  },

  {
    id: 4,
    title: "Superbad",
    genre: "comedy",
    year: "2007",
    duration: 1.53,
    img: "img/superbad.webp",
    url: "https://www.imdb.com/title/tt0829482/",
  },

  {
    id: 5,
    title: "It",
    genre: "horror",
    year: "2017",
    duration: 2.15,
    img: "img/it.webp",
    url: "https://www.imdb.com/title/tt1396484/",
  },

  {
    id: 6,
    title: "The Hangover",
    genre: "comedy",
    year: "2009",
    duration: 1.4,
    img: "img/the-hangover.webp",
    url: "https://www.imdb.com/title/tt1119646/",
  },
  {
    id: 7,
    title: "The Conjuring",
    genre: "horror",
    year: "2013",
    duration: 1.52,
    img: "img/the-conjuring.webp",
    url: "https://www.imdb.com/title/tt1457767/",
  },
  {
    id: 8,
    title: "Interstellar",
    genre: "science-fiction",
    year: "2014",
    duration: 2.55,
    img: "img/interstellar.jpg",
    url: "https://www.imdb.com/title/tt0816692/",
  },
  {
    id: 9,
    title: "The Matrix",
    genre: "science-fiction",
    year: "1999",
    duration: 3.02,
    img: "img/the-matrix.webp",
    url: "https://www.imdb.com/title/tt0133093/",
  },
  {
    id: 10,
    title: "Pulp Fiction",
    genre: "drama",
    year: "1994",
    duration: 1.39,
    img: "img/pulp-fiction.webp",
    url: "https://www.imdb.com/title/tt0110912/",
  },
];

//-----------------------------------------------------------------------------
//Her kommer de fire variabler

//Variablen finder og peger på html elementet med id movies-container
const movieContainer = document.querySelector("#movies-container");

//Denne finder og henter den valgte kategori (genre) fra dropdownen.
const selectedCategory = document.querySelector("#category-select");

//finder søgefeltet fra vores html
const searchInput = document.querySelector("#gsearch");

//Denne finder vores form i html
const form = document.querySelector("form");

//Her vil vi lave en funktion som kan filtere vores film ud fra kategori (genre) og filtrer vores film mens der skrives i søgefeltet
function filterMovies() {
  //henter den valgte værdi fra dropdown.menuen og gemmer den i en konstant variabel med navnet selectedValue
  const selectedValue = selectedCategory.value;

  //henter teksten fra søgefeltet og gemmer den i en konstant variabel med navnet searchTerm. Her bruges der både toLowerCase for at lave alle bogstaver om til små (for at undgå at hvis brugeren skriver med store at den så siger det er forkert). Der bruges for trim, for at fjerne hvis brugeren nu skulle skrive nogle unødvendige mellemrum.
  const searchTerm = searchInput.value.toLowerCase().trim();

  //Her oprettes en omskiftelig variabel der pejer på hele arrayet til at starte med (ALLE)
  let filteredMovies = movies;


  //-----------------------------------------------------------------------------
  //Nu kommer delen hvor vi faktisk skal gøre så man kan filtere i filmene

  // if statements, så filmene filtreres ud fra den valgte kategori.
  //Hvis brugeren ikke (!=) har valgt "alle"
  if (selectedValue != "alle") {
    // så skal filteredMovies være i lig med filteredMovies.filtered med parameteret movie. Her laver den et nyt array med elementer.
    filteredMovies = filteredMovies.filter((movie) => {
      // Her returnere og laver den et nyt array med elementer som indeholde den valgte selectedValue bruger har valgt i dropdown-menuen. Det kunne eksempelvis være horror, så bliver der kun vist film med genreen horror.
      return movie.genre === selectedValue;
    });
  }

  //denne if statement filtere indhold i søgefeltet
  //den siger at hvis søgefeltet ikke er tomt, altså der er noget i søgefeltet
  if (searchTerm != "") {
    // så skal den sige at filteredMovies er lig med filteredMovies.filter med movie som parameter. Her tjekker den om filmenes titler indeholder det er der blevet skrevet i søgeordet.
    filteredMovies = filteredMovies.filter((movie) => {
      // hvorefter den returnere de film som indeholder det i søgefeltet.
      return movie.title.toLowerCase().includes(searchTerm);
    });
  }

  //denne viser de filtrerede film 
  displayMovies(filteredMovies);
}

//-----------------------------------------------------------------------------
//Her gør vi sådan at den lytter efter handlinger, ved at bruge addEventListener
//Vi siger at når der sket en forandring (change) i selectedCategory, så skal den affyre funktionen filterMovies af
selectedCategory.addEventListener("change", filterMovies);

//Vi siger at når der laves et input i searchInput, så skal den affyre funktionen filterMovies af
searchInput.addEventListener("input", filterMovies)

//For at undgå at siden skal reloade når formularen er sendt, tilføjer vi en addEventListenner på form der lytter efter et submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  filterMovies();
});


//Her laves der en funktion med brug af .map og .join automatisk indsætter html-struktur 
function displayMovies(movieList) {
  //vi laver en konstant variable som gennemløber hvor enkelt film i moviesList ved at bruge .map (.map laver et nyt array). 
  const html = movieList.map((movie) => {
    //For hver film oprettes en template literal (her henter den selv automatisk værdiener da der er blevet brugt ${})   
    return `
    <article class="movie-card">
    <h2>${movie.title}</h2>
    <ul>
        <li>${movie.genre}</li>
        <li>${movie.year}</li>
        <li>${movie.duration}</li>
    </ul>
    <figure>
        <a href="${movie.url}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.img}" alt="${movie.title}">
        </a>
        <figcaption>Læs mere på IMDB</figcaption>
    </figure>
  </article>`;
    })

    //med .join returener det den med en lang tekst-streng
    .join("");

    //her puttes det ind i vores movieContainer der er i vores html
  movieContainer.innerHTML = html;
}

//denne viser filmene
displayMovies(movies);

