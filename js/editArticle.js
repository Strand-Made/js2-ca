import { baseUrl } from "./data/api.js";
import { createMessage } from "./utilis/messages/message.js";
import actionAlert from "./utilis/messages/actionAlert.js";
import topNav from "./navbar/navbar.js";
import { getToken, getUsername } from "./data/storage.js";
import { deleteArticle } from "./utilis/articles/deleteArticle.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
// if no article id in String, return to home
if (!id) {
  location.href = "/";
}

const username = getUsername();
if (!username) {
  location.href = "/";
}
// create nav
topNav();

const form = document.querySelector(".form-edit-articles");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const idInput = document.querySelector("#id");
const summary = document.querySelector("#summary");
const messageContainer = document.querySelector(".message-container");
const loader = document.querySelector(".progress");

// Get article
(async function () {
  try {
    const response = await fetch(baseUrl + "/articles/" + id);
    const result = await response.json();
    document.title = "Edit " + result.title;
    title.value = result.title;
    author.value = result.author;
    idInput.value = result.id;
    summary.value = result.summary;

    // Delete article
    deleteArticle(id);
  } catch (error) {
    createMessage(
      messageContainer,
      "is-error",
      "Error",
      "There was an error getting the article"
    );
  } finally {
    form.style.display = "block";
    loader.style.display = "none";
  }
})();

form.addEventListener("submit", submitChange);
// Submit changes made to article on click
function submitChange(event) {
  event.preventDefault();
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  const idInputValue = idInput.value;

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
  updateArticle(titleValue, authorValue, idInputValue, summaryValue);
}
// update changes to article
async function updateArticle(title, author, id, summary) {
  const url = baseUrl + "/articles/" + id;
  // create data
  const data = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.updated_at) {
      createMessage(
        messageContainer,
        ".is-success",
        "Success",
        "Update Successfull! You will be redirected."
      );
      actionAlert();
    }
  } catch (error) {
    console.log(error);
    createMessage(messageContainer, "is-error", "error", "An error occured");
  }
}
