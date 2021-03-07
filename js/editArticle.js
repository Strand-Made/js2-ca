import { baseUrl } from "./data/api.js";
import { createMessage } from "./utilis/messages/message.js";
import topNav from "./navbar/navbar.js";
import { getToken } from "./data/storage.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

topNav();
const form = document.querySelector(".form-edit-articles");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const idInput = document.querySelector("#id");
const summary = document.querySelector("#summary");
const messageContainer = document.querySelector(".message-container");
const loader = document.querySelector(".progress");

(async function () {
  try {
    const response = await fetch(baseUrl + "/articles/" + id);
    const result = await response.json();
    title.value = result.title;
    author.value = result.author;
    idInput.value = result.id;
    summary.value = result.summary;
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

async function updateArticle(title, author, id, summary) {
  const url = baseUrl + "/articles/" + id;
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
    console.log(result);

    if (result.updated_at) {
      createMessage(
        messageContainer,
        ".is-success",
        "Success",
        "Update Successfull! You will be redirected."
      );
      successAlert();
    }
  } catch (error) {
    console.log(error);
    createMessage(messageContainer, "is-error", "error", "An error occured");
  }
}

function successAlert() {
  window.scrollTo(0, 0);
  window.setTimeout(function () {
    window.location;
    document.location.href = "/";
  }, 2500);
}
