import { useEffect, useState } from "react";
import PageHeader from "../ui-components/PageHeader";
import Loader from "../ui-components/Loader";
import PostCard from "../ui-components/Card";
import axios from "axios";

export default function Favorites() {
  const [favoritesIds, setFavoritesIds] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [favoritesPosts, setFavoritesPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoritesIds.length === 0) {
      setFavoritesPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:3001/favorite-posts", {
        params: { ids: favoritesIds.join(",") },
      })
      .then((res) => setFavoritesPosts(res.data))
      .catch(() => setFavoritesPosts([]))
      .finally(() => setLoading(false));
  }, [favoritesIds]);

  
  useEffect(() => {
    const handler = () => {
      const newFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesIds(newFavorites);
    };

    window.addEventListener("favoritesUpdated", handler);

    return () => {
      window.removeEventListener("favoritesUpdated", handler);
    };
  }, []);

  if (loading) return <div className="w-full h-[100vh] flex items-center justify-center ">
    <Loader />
  </div>;

  if (favoritesPosts.length === 0)
    return (
      <div className="pt-[100px]">
        <PageHeader title="Sevimlilər" />
        <p className="text-center mt-10">Sevimlilər siyahısı boşdur.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader title="Sevimlilər" />
      <div className="flex flex-col gap-[15px] min-h-[100vh] bg-gray-50 mt-[50px] pt-[20px] pb-[100px] p-[5px] lg:px-6">
        <div className="flex flex-col gap-[5px]">
          <div className="w-full bg-gray-50 overflow-hidden mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-[420px]:gap-[3px] gap-[15px]">
            {favoritesPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
