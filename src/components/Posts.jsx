import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../ui-components/Card";
import Loader from "../ui-components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getPosts,clearPosts } from "../../redux/postsSlice";


export default function Posts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { categoryName } = useSelector((state) => state.category);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const limit = 2;

  // postları yükle thunk ile
  const fetchPosts = useCallback(() => {
    const skip = (page - 1) * limit;

    dispatch(getPosts({ category: categoryName, skip, limit }))
      .unwrap()
      .then((res) => {
        setHasMore(res.length === limit);
      })
      .catch((err) => {
        console.error("Postlar alınarkən xəta:", err);
      });
  }, [dispatch, categoryName, page]);

  // category dəyişəndə sıfırla
  useEffect(() => {
    dispatch(clearPosts());
    setPage(1);
    setHasMore(true);
  }, [categoryName, dispatch]);

  // page və category dəyişəndə yükle
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // observer ayarı
  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, hasMore]);

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-[100vh] lg:mt-[-50px]">
        <Loader />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="h-full flex items-center dark:bg-[#121212] justify-center pt-[100px] max-[643px]:pt-[150px]">
        <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl  text-center ">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-red-600 text-2xl">⚠️</div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Məhsul tapılmadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[15px] min-h-[100vh] pt-[30px] bg-white dark:bg-[#121212] lg:bg-gray-100  pb-[100px] p-[5px] lg:px-6">
      <div className="flex flex-col gap-[5px]">
        <h3 className="text-slate-400 pl-[4px] text-md font-medium dark:text-white">{categoryName}</h3>
        <div className="w-full bg-white dark:bg-[#121212] lg:bg-gray-100 overflow-hidden mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-[420px]:gap-[3px] gap-[15px] ">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div ref={loaderRef} className="h-10">
          {loading && page > 1 && <Loader />}
        </div>
      </div>
    </div>
  );
}
