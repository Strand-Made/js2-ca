import topNav from "./navbar/navbar.js";
import { createMessage } from "./utilis/messages/message.js";
import { baseUrl } from "./data/api.js";
import { getToken, getUsername } from "./data/storage.js";
// create nav
topNav();

const messageContainer = document.querySelector(".message-container");
const form = document.querySelector(".form-add-articles");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");

const username = getUsername();
if (!username) {
  location.href = "/";
}

form.addEventListener("submit", submitArticle);

export function submitArticle(event) {
  event.preventDefault();
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  if (
    titleValue.length === 0 ||
    authorValue.length === 0 ||
    summaryValue.length <= "10"
  ) {
    return createMessage(
      messageContainer,
      "warning",
      "Warning",
      "Check your values. Remember: summary has to be longer than 10 characters"
    );
  }
  addArticle(titleValue, authorValue, summaryValue);
}

async function addArticle(title, author, summary) {
  const url = baseUrl + "/articles";
  const token = getToken();
  // create article data
  const data = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.created_at) {
      createMessage(
        messageContainer,
        "success",
        "Success!",
        "Your article has been created! Window will refresh shortly"
      );
      form.reset();
      window.scrollTo(0, 0);
      window.setTimeout(function () {
        location.reload();
      }, 2500);
    }

    if (result.error) {
      createMessage(messageContainer, "error", "Error", result.message);
    }
  } catch (error) {
    createMessage(messageContainer, "error", "Error", error);
  }
}

// Get list of articles to edit
(async function () {
  const response = await fetch(baseUrl + "/articles");
  const result = await response.json();
  const articleList = document.querySelector(".collection");

  result.forEach((article) => {
    articleList.innerHTML += `
    <li class="box collection-item is-flex is-flex-direction-column is-justify-content-space-between ">
        <h4 class="is-size-4">${article.title}</h4>
        <p class="is-italic mb-2">${article.author}<p>
        <p>${article.summary}</p>
        <a class="button is-info mt-1 is-align-self-flex-end edit-button" href="editArticle.html?id=${article.id}">Edit</a>
    </li>`;
  });
})();
