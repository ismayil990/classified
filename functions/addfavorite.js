import { toast } from "react-toastify";
export const toggleFavorite = (e, id) => {
  e.preventDefault();

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
   window.dispatchEvent(new Event("favoritesUpdated"));
};