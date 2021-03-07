import { getUsername, clearStorage } from "../data/storage.js";

export default function topNav() {
  const navbarContainer = document.querySelector(".navbar");
  const { pathname } = document.location;
  const username = getUsername();

  // if no user is logged in
  let userLoggedLink = `
                        <div class="navbar-end">
                        <a href="login.html" class="navbar-item
                        ${pathname === "/login.html" ? "active" : ""}">Login</a>
                        </div>
                        `;

  // If user is logged in
  if (username) {
    userLoggedLink = `<div class="navbar-end">
      <a href="edit.html" class="navbar-item 
      ${pathname === "edit/" ? "active" : ""}">Edit</a>
      <span class="navbar-item user has-background-grey-dark has-text-primary-light">Logged in as: ${username}</span>
      <div class="navbar-item">
        <button type="button" class="button is-danger logout-btn">Logout</button>
      </div>
      </div>`;
  }

  navbarContainer.innerHTML = `
    <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/"> <p class="is-size-4">JS 2</p> </a>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a href="/" class="navbar-item is-tab ${
              pathname === "/" ? "active" : ""
            }"> Home </a>
            <a href="favourites.html" class="navbar-item ${
              pathname === "/favourites.html" ? "active" : ""
            }"> Favourites </a>
          </div>
          ${userLoggedLink}
        </div>
        
      </div>
`;

  const logoutButton = document.querySelector(".logout-btn");
  if (logoutButton) {
    logoutButton.onclick = () => {
      clearStorage("user");
      clearStorage("token");
      location.href = "/login.html";
    };
  }

  // Code below from Bulma.io for mobile friendly navbar
  document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  });
}
