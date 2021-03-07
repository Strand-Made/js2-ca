import { baseUrl } from "./data/api.js";
import { createMessage } from "./utilis/messages/message.js";
import { saveToken, saveUser } from "./data/storage.js";
import topNav from "./navbar/navbar.js";

const form = document.querySelector(".login-form");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const messageContainer = document.querySelector(".message-container");
// bulma mobileNav
topNav();

form.addEventListener("submit", loginHandler);

function loginHandler(event) {
  event.preventDefault();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return createMessage(
      messageContainer,
      "warning",
      "Login Error",
      "Check your details"
    );
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = baseUrl + "/auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.user) {
      saveToken(result.jwt);
      saveUser(result.user);
      location.href = "/";
    }

    if (result.error) {
      createMessage(
        messageContainer,
        "error",
        "Error",
        "Incorrect login details"
      );
    }
  } catch (error) {
    console.log(error);
    createMessage(messageContainer, "error", "Error", "An error has occured");
  }
}
