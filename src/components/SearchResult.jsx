import { useSelector,useDispatch } from "react-redux"
import PostCard from "../ui-components/Card"
import { ArrowLeft,X } from "lucide-react"
import { closeSearch } from "../../redux/postsSlice"

export default function SearchResult(){
    const {searchResults}=useSelector(state=>state.posts)
    const dispatch=useDispatch()
    return(
        <div className={`fixed z-[80] w-full top-0 left-0 min-h-[100vh] bg-gray-50 flex flex-col gap-[20px]`}>
            <div className="flex gap-[20px] items-center h-[40px] p-2">
                <X onClick={()=>{dispatch(closeSearch())}} className="text-slate-600"/>
                <h1 className="text-slate-800 font-medium">Axtarış nəticəsi</h1>
            </div>
              <div className="w-full bg-gray-50 overflow-hidden mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-[420px]:gap-[3px] gap-[15px] p-2">
                      {searchResults.map((post) => (
                        <PostCard key={post._id} post={post} />
                      ))}
                    </div>

        </div>
    )
}