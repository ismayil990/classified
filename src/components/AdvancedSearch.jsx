import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Undo2, SlidersHorizontal } from "lucide-react";


import SelectCategory from "../ui-components/SelectCategory";
import Input from "../ui-components/Input";
import Button from "../ui-components/Button";
import { fieldsConfig } from "../../data/fieldsconfig";
import { colorMap, locations } from "../../data/options";
import HybridSelect from "../ui-components/HybridSelect";
import { searchPosts } from "../../redux/postsSlice";
import { getCategories } from "../../redux/slice";


const SkeletonSelect = () => (
  <div className="w-full h-[42px] rounded-lg bg-gray-200 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]" />
  </div>
);

export default function AdvancedSearch() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ category: "" });
  const [errors, setErrors] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {search_loading}=useSelector(state=>state.posts)

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const selectedCategory = categories.find((cat) => cat.name === formState.category);
  const brands = selectedCategory?.brands.map((b) => b.name) || [];
  const models = selectedCategory?.brands.find((b) => b.name === formState.brand)?.models || [];

const handleChange = (field, value) => {
  setFormState((prev) => {
      if (field === "category") {
  if (prev.category === value) {
    return prev; 
  }

  return {
    category: value, 

  };
}
    if (field === "brand") {
      return {
        ...prev,
        brand: value,
        model: prev.brand === value ? prev.model : "",  
      };
    }
    return { ...prev, [field]: value };
  });
  setErrors((prev) => ({ ...prev, [field]: "" }));
};

  const searchPost = async () => {
    dispatch(searchPosts(formState));
  };

  const renderFields = () => {
    if (!categories || categories.length === 0) {
      return (
        <>
          <SkeletonSelect label="Kateqoriya" />
          <SkeletonSelect label="Marka" />
          <SkeletonSelect label="Model" />
          <SkeletonSelect label="Şəhər" />
        </>
      );
    }

    return (
       <>
        <SelectCategory
          label="Kateqoriya"
          items={categories?.map((cat) => cat.name)}
          title={formState.category || "Kateqoriya seçin"}
          onClick={(v) => handleChange("category", v)}
          selectedItem={formState.category}
          setSelectedItem={setSelectedItem}
        />

        {fieldsConfig[formState.category]?.map((field, index) => {
          const allowedFields = ["make", "model", "ram", "memory", "status", "barter"];
          if (!allowedFields.includes(field.name)) return null;

          if (field.name === "make") {
            return (
              <SelectCategory
                label="Marka"
                defaultLabel="Marka"
                key={index}
                items={brands.sort((a, b) => {
  if (a === "Digər") return 1;      
  if (b === "Digər") return -1;      
  return a.localeCompare(b, 'az', { sensitivity: 'base' }); 
})}
           
                onClick={(v) => handleChange("brand", v)}
                selectedItem={formState.brand}
                setSelectedItem={setSelectedItem}
              />
            );
          }

           if (field.name === "model") {
                    return (
                      <HybridSelect
                        label="Model"
                        key={index}
                        options={models}
                         value={formState.model || ""}
                        onChange={(v) => handleChange("model", v)}
                         disabled={!formState.brand}
                      />
                    );
                  }

          if (field.type === "select") {
            return (
              <SelectCategory
                label={field.label}
                key={index}
                items={field.options}
                selectedItem={formState[field.name]}
                setSelectedItem={setSelectedItem}
                onClick={(v) => handleChange(field.name, v)}
                {...(field.name === "color" ? { colorMap } : {})}
              />
            );
          }

          if (field.type === "text") {
            return (
              <Input
                key={index}
                type="text"
                placeholder={field.label}
                value={formState[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            );
          }

          return null;
        })}

        <SelectCategory
          label="Şəhər"
          items={locations}
          onClick={(v) => handleChange("city", v)}
             selectedItem={formState["city"]}
                setSelectedItem={setSelectedItem}
        />

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min qiymət"
            value={formState.minprice || ""}
            onChange={(e) => handleChange("minprice", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Max qiymət"
            value={formState.maxprice || ""}
            onChange={(e) => handleChange("maxprice", Number(e.target.value))}
          />
        </div>

        <Button text={search_loading ? "Axtarılır..." : "Axtar"} type="button" onClick={searchPost} />
      </>
    );
  };

  return (
    <div className="w-full pt-[80px] px-2 lg:px-6 bg-white  md:bg-gray-100 lg:bg-gray-100 lg:pb-[20px]">
      <div className="md:hidden flex justify-end w-full">
        <button
          className="w-full flex items-center h-[50px] justify-between bg-[#F8F8F8]  px-4 py-[7px] border-[1px] border-gray-200  rounded-xl"
          onClick={() => setShowFilter(true)}
        >
          <p style={{ fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` }} className="font-medium text-slate-600 ">Ətraflı axtarış</p>
          <SlidersHorizontal size={20}  />
        </button>
      </div>

      {/* Desktop Filter Grid */}
      <div className="hidden  p-2 rounded-md md:flex flex-wrap justify-center gap-5">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 w-full">
          {renderFields()}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilter && (
        <div className="fixed top-0 left-0 w-full h-full z-70 bg-white  overflow-y-auto shadow-lg md:hidden">
          <div className="flex justify-between items-center p-4 mb-4 border-b-2 border-gray-100  w-full">
            <h2 className="text-lg  font-semibold">Filtrlə</h2>
            <button onClick={() => setShowFilter(false)} className="text-gray-600 ">
              <Undo2 className="w-5 h-5" />
            </button>
          </div>
          <form className="flex flex-col gap-4 pt-[20px] p-4">{renderFields()}</form>
        </div>
      )}
    </div>
  );
}
