import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Undo2, SlidersHorizontal } from "lucide-react";
import axios from "axios";

import SelectCategory from "../ui-components/SelectCategory";
import Input from "../ui-components/Input";
import Button from "../ui-components/Button";
import { fieldsConfig } from "../../data/fieldsconfig";
import { colorMap, locations } from "../../data/options";

import { searchPosts } from "../../redux/postsSlice";
import { getCategories } from "../../redux/slice";

// Skeleton komponenti (placeholder üçün)
const SkeletonSelect = ({ label = "" }) => (
  <div className="w-full animate-pulse">
    <label className="block text-sm mb-1 text-gray-500">{label}</label>
    <div className="h-[42px] bg-gray-200 rounded-lg w-full"></div>
  </div>
);

export default function AdvancedSearch() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ category: "" });
  const [errors, setErrors] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [animationClass, setAnimationClass] = useState("animate-slideUp");
  const isDisabled = !formState.category;

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const selectedCategory = categories.find((cat) => cat.name === formState.category);
  const brands = selectedCategory?.brands.map((b) => b.name) || [];
  const models = selectedCategory?.brands.find((b) => b.name === formState.brand)?.models || [];

  const handleChange = (field, value) => {
    setFormState((prev) => {
      if (field === "brand") {
        const updated = { ...prev, brand: value };
        delete updated.model;
        return updated;
      }
      return { ...prev, [field]: value };
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const sendOtp = async () => {
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
        />

        {fieldsConfig[formState.category]?.map((field, index) => {
          const allowedFields = ["make", "model", "ram", "memory", "status", "barter"];
          if (!allowedFields.includes(field.name)) return null;

          if (field.name === "make") {
            return (
              <SelectCategory
                label="Marka"
                key={index}
                items={brands}
                title={formState.brand || "Marka"}
                onClick={(v) => handleChange("brand", v)}
              />
            );
          }

          if (field.name === "model") {
            return (
              <SelectCategory
                label="Model"
                key={index}
                items={models}
                title={formState.model || "Model"}
                onClick={(v) => handleChange("model", v)}
              />
            );
          }

          if (field.type === "select") {
            return (
              <SelectCategory
                label={field.label}
                key={index}
                items={field.options}
                title={formState[field.name] || field.label}
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
          title={formState.city || "Şəhər"}
          onClick={(v) => handleChange("city", v)}
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

        <Button text="Axtar" type="button" onClick={sendOtp} />
      </>
    );
  };

  return (
    <div className="w-full pt-[80px] px-2 lg:px-6 bg-white lg:bg-gray-100 lg:pb-[20px]">
      {/* Filter Toggle Button for Mobile */}
      <div className="md:hidden flex justify-end w-full">
        <button
          className="w-full flex items-center h-[50px] justify-between bg-gray-100 px-4 py-[7px] border-[1px] border-gray-200 rounded-xl"
          onClick={() => setShowFilter(true)}
        >
          <p className="font-medium text-slate-600">Ətraflı axtarış</p>
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Desktop Filter Grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-5">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 w-full">
          {renderFields()}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilter && (
        <div className="fixed top-0 left-0 w-full h-full z-70 bg-white p-5 overflow-y-auto shadow-lg md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtrlə</h2>
            <button onClick={() => setShowFilter(false)} className="text-gray-600">
              <Undo2 className="w-5 h-5" />
            </button>
          </div>
          <form className="flex flex-col gap-4">{renderFields()}</form>
        </div>
      )}
    </div>
  );
}
