export function saveFavs(favourites) {
  // save favourites to local storage
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
export function getFavourites() {
  const favourite = localStorage.getItem("favourites");
  if (!favourite) {
    return [];
  } else {
    return JSON.parse(favourite);
  }
}

export function clearStorage() {
  localStorage.clear();
}
