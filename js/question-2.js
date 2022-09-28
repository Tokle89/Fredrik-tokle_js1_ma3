const gameContainer = document.querySelector(".games-container");
const apiKey = "d2316e921dc2464e9c73394403818610";
const url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;
import { displayError } from "./components/displayError.js";

const createHtml = (gamesList) => {
  const listOfGames = gamesList;

  gameContainer.innerHTML = "";

  for (let i = 0; i < listOfGames.length; i++) {
    if (i === 8) {
      break;
    }
    const gameRating = listOfGames[i].rating;
    const nameOfGame = listOfGames[i].name;
    const numberOfTags = listOfGames[i].tags.length;

    gameContainer.innerHTML += `<div>
                                <h2>${nameOfGame}</h2>
                                <p>Rating: ${gameRating}</p>
                                <p>Number of Tags: ${numberOfTags}</p>
                                </div>`;
  }
};

async function rawgApi() {
  try {
    const respons = await fetch(url);
    const data = await respons.json();
    const list = data.results;

    createHtml(list);
  } catch (error) {
    console.warn(error);
    gameContainer.innerHTML = displayError("An error has occurred when retrieving the API");
  }
}

rawgApi();
