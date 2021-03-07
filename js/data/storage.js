const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = getFromStorage(userKey);
  if (user) {
    return user.username;
  }
}

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

export function clearStorage(key) {
  localStorage.removeItem(key);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }
  return JSON.parse(value);
}
