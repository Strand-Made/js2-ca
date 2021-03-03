export function createMessage(container, type, title, message) {
  container.innerHTML = `<article class="message ${type}">
                            <div class="message-header">
                            <p>${title}</p>
                            <button class="delete" aria-label="delete"></button>
                            </div>
                            <div class="message-body">
                            <p>${message}</p>
                            </div>
                            </article>`;
}
