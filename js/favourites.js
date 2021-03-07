import topNav from "./navbar/navbar.js";
import { getFavourites, clearStorage } from "./data/storage.js";
// create nav
topNav();
const listContainer = document.querySelector(".collection");
const favourites = getFavourites();
if (favourites.length === 0) {
  listContainer.innerHTML = "<p>You have no favourites</p>";
}
favourites.forEach((fav) => {
  listContainer.innerHTML += `
                                <li class="box collection-item is-flex is-flex-direction-row is-justify-content-space-between">
                                    <div>
                                        <h4 class="is-size-4">${fav.title}</h4>
                                        <p class="is-italic mb-2">${fav.author}<p>
                                        <p>${fav.summary}</p>
                                    </div>
                                <div><span class="icon"><i class="fas fa-heart" data-id="${fav.id}" data-title="${fav.title}"></i></span></div>
        
                                </li>`;
});

const button = document.querySelector(".clear-button");
button.addEventListener("click", clearButton);

function clearButton() {
  clearStorage("favourites");
  listContainer.innerHTML = "<p>You have no favourites</p>";
}
