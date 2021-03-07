import createHtml from "../createHtml.js";
export function filterArticles(articles) {
  const filter = document.querySelector("#filter");
  filter.onkeyup = function (event) {
    const filterValue = event.target.value.trim().toLowerCase();

    const filteredArticles = articles.filter((article) => {
      if (article.title.toLowerCase().startsWith(filterValue)) {
        return true;
      }
    });
    createHtml(filteredArticles);
  };
}
