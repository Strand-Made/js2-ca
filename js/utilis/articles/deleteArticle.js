import { baseUrl } from "../../data/api.js";
import { getToken } from "../../data/storage.js";
import { createMessage } from "../messages/message.js";
import actionAlert from "../messages/actionAlert.js";
export function deleteArticle(id) {
  const deleteButton = document.querySelector(".delete-btn");
  deleteButton.addEventListener("click", deleteHandler);
  const messageContainer = document.querySelector(".message-container");

  function deleteHandler() {
    (async function () {
      const willDelete = confirm("Do you want to delete this?");

      // If user clicks yes on confirm message
      if (willDelete) {
        // Get article url
        const url = baseUrl + "/articles/" + id;
        const token = getToken();

        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          createMessage(
            messageContainer,
            ".is-success",
            "success",
            "Article successfully deleted"
          );
          actionAlert();
        } catch (error) {
          createMessage(
            messageContainer,
            ".is-error",
            "Error",
            "An Error has occured"
          );
        }
      }
    })();
  }
}
