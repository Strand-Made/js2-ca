import { baseUrl } from "./data/api.js";
import createHtml from "./utilis/createHtml.js";
import topNav from "./navbar/navbar.js";
import { createMessage } from "./utilis/messages/message.js";
import { getFavourites, saveFavs } from "./data/storage.js";
import { filterArticles } from "./utilis/articles/filterArticle.js";

const messageContainer = document.querySelector(".message-container");

//create nav
topNav();

(async function () {
  try {
    const url = baseUrl + "/articles";
    const response = await fetch(url);
    const result = await response.json();
    const articleList = result;

    createHtml(articleList);
    filterArticles(articleList);
  } catch (error) {
    createMessage(messageContainer, "danger", "Error", "A Error has occured");
  }
})();
// Favourite on click
export function onClick() {
  this.classList.toggle("far");
  this.classList.toggle("fas");
  const title = this.dataset.title;
  const id = this.dataset.id;
  const author = this.dataset.author;
  const summary = this.dataset.summary;

  const currentFavourites = getFavourites();
  // check if article exist
  const articleExist = currentFavourites.find(function (favourite) {
    return favourite.id === id;
  });

  //   If article dont exist in storage add it, else remove it
  if (!articleExist) {
    const article = { title: title, id: id, author: author, summary: summary };
    currentFavourites.push(article);
    saveFavs(currentFavourites);
  } else {
    const newFavourites = currentFavourites.filter(
      (favourite) => favourite.id !== id
    );
    console.log(newFavourites);
    saveFavs(newFavourites);
  }
}
