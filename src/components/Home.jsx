import CategoryForm from "../ui-components/AddCategory";
import CategoryNav from "../ui-components/CategoryNav";
import CategorySelect from "./CategorySelect";
import Header from "./Header";
import Login from "./Login";
import { useSelector } from "react-redux";
import { useState } from "react";
import BottomMenu from "./BottomMenu";
import Posts from "./Posts";
import SearchResult from "./SearchResult";
import AdvancedSearch from "./AdvancedSearch";

export default function Home(){
     const openCategoryMenu = useSelector(
    (state) => state.category.openCategoryMenu
  );
  const showSearchPage=useSelector(state=>state.posts.showSearchPage)
    return(
        <div className="flex flex-col gap-[0px]">
            <Header/>   
            <AdvancedSearch/>      
            <Posts/>
            <BottomMenu />
             {openCategoryMenu && (<CategorySelect/> )}
        
        </div>
    )
}