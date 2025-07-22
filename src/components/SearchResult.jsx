import { useSelector, useDispatch } from "react-redux";
import PostCard from "../ui-components/Card";
import { TiArrowBackOutline } from "react-icons/ti";
import { closeSearch } from "../../redux/postsSlice";

export default function SearchResult() {
  const { searchResults } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-[80] bg-gray-50 flex flex-col">
      {/* Sabit başlıq */}
      <div className="flex gap-4 items-center h-[50px] px-4 border-b border-gray-200 shrink-0">
        <TiArrowBackOutline
          onClick={() => dispatch(closeSearch())}
          size={25}
          className="text-slate-600 cursor-pointer"
        />
        <h1 className="text-slate-800 font-medium">Axtarış nəticəsi</h1>
      </div>

      {/* Scroll olan hissə */} {searchResults.length === 0 && (
    <p className="text-center text-gray-500 text-lg pt-[100px]">Axtarışa uyğun heç bir nəticə tapılmadı.</p>
  )}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-[420px]:gap-[3px] gap-[15px]">
          {searchResults.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
