import { useState, useEffect } from "react";
import axios from "axios";

import SelectCategory from "../ui-components/SelectCategory";
import Input from "../ui-components/Input";
import Button from "../ui-components/Button";

import { fieldsConfig } from "../../data/fieldsconfig";
import { colorMap, locations } from "../../data/options";

import { CarFront, LaptopMinimal, Smartphone, Undo2, SlidersHorizontal } from "lucide-react";

export default function AdvancedSearch() {
  const [formState, setFormState] = useState({ category: "", images: [] });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    axios.get("https://backend-kmti.onrender.com/categories/full")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Kategoriya alınarkən xəta:", err));
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
    const newErrors = {};
    if (!formState.category) newErrors.category = "Kateqoriya seçilməyib";
    if (!formState.city) newErrors.city = "Şəhər seçilməyib";
    if (!formState.minprice && !formState.maxprice) newErrors.price = "Qiymət aralığı daxil edin";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("Filtr axtarışı:", formState);
  };

  const renderFields = () => (
    <>
      <SelectCategory
        items={categories.map((cat) => cat.name)}
        title={formState.category || "Kateqoriya seçin"}
        onClick={(v) => handleChange("category", v)}
      />

      {fieldsConfig[formState.category]?.map((field, index) => {
        const allowedFields = ["make", "model", "ram", "memory", "status", "barter"];
        if (!allowedFields.includes(field.name)) return null;

        if (field.name === "make") {
          return (
            <SelectCategory
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
        items={locations}
        title={formState.city || "Şəhər"}
        onClick={(v) => handleChange("city", v)}
      />

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Min qiymət"
          value={formState.minprice || ""}
          onChange={(e) => handleChange("minprice", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max qiymət"
          value={formState.maxprice || ""}
          onChange={(e) => handleChange("maxprice", e.target.value)}
        />
      </div>

      <Button text="Axtar" type="button" onClick={sendOtp} />
    </>
  );

  return (
    <div className="w-full pt-[80px] px-2 lg:px-6 bg-gray-50">
      {/* Filter Toggle Button for Mobile */}
      <div className="md:hidden flex justify-end  w-full">
        <button
          className="w-full flex items-center h-[50px] justify-between bg-white px-4 py-[7px] border-1 border-gray-100 rounded-xl"
          onClick={() => setShowFilter(true)}
        >
          <p className="font-medium text-slate-600">Ətraflı axtarış</p>
          <SlidersHorizontal size={20}  />
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
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-white p-5 overflow-y-auto shadow-lg md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtr</h2>
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
