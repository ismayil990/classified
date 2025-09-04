import CategorySelect from "./CategorySelect";
import Header from "./Header";
import { useSelector } from "react-redux";
import BottomMenu from "./BottomMenu";
import Posts from "./Posts";
import SearchResult from "./SearchResult";
import AdvancedSearch from "./AdvancedSearch";
import Menu from "../ui-components/Menu";
export default function Home(){
     const openCategoryMenu = useSelector(
    (state) => state.category.openCategoryMenu
  );
    const {menuBar}=useSelector(state=>state.category)
  const {showSearchPage}=useSelector(state=>state.posts)
    return(
        <div className="flex flex-col gap-[0px]">
      {menuBar && <Menu/>}
          {showSearchPage && <SearchResult/>}
            <Header/>   
              <AdvancedSearch/>    
             <Posts/>
             <BottomMenu />
             {openCategoryMenu && (<CategorySelect/> )}
        
        
        </div>
    )
}