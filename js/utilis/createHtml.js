import { onClick } from "../index.js";
import { getFavourites } from "../data/storage.js";
export default function createHtml(content) {
  const listContainer = document.querySelector(".collection");
  listContainer.innerHTML = "";
  const favourites = getFavourites();
  content.forEach((item) => {
    let heartClass = "far";
    const doesArticleExist = favourites.find(function (favourite) {
      return parseInt(favourite.id) === item.id;
    });

    if (doesArticleExist) {
      heartClass = "fas";
    }

    listContainer.innerHTML += `<li class="box collection-item is-flex is-flex-direction-row is-justify-content-space-between">
                                            <div>
                                                <h4 class="is-size-4">${item.title}</h4> 
                                                <p class="is-italic mb-2">${item.author}<p>
                                                <p>${item.summary}</p>
                                            </div>
                                            <div>
                                            <span class="icon"><i class="${heartClass} fa-heart" data-author="${item.author}" data-summary="${item.summary}" data-id="${item.id}" data-title="${item.title}"></i></span>
                                            </div>
                                            
                                        </li>`;
  });
  const favButton = document.querySelectorAll("li span i");

  favButton.forEach(function (button) {
    button.addEventListener("click", onClick);
  });
}
