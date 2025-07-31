import { useState, useEffect } from "react";
import axios from "axios";

import SelectCategory from "../ui-components/SelectCategory";
import PageHeader from "../ui-components/PageHeader";
import Button from "../ui-components/Button";
import { fieldsConfig } from "../../data/fieldsconfig";
import { colorMap, locations } from "../../data/options";
import Input from "../ui-components/Input";
import MultiSelectCategory from "../ui-components/MultipleSelect";
import Textarea from "../ui-components/Textarea";
import MultiImageUpload from "../ui-components/ImageUpload";
import { CarFront, LaptopMinimal, Smartphone } from "lucide-react";
import PhoneInput from "../ui-components/PhoneInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import HybridSelect from "../ui-components/HybridSelect";

function capitalizeWords(text) {
  if (!text) return "";
  return text
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function removeBrandFromModel(model, brand) {
  if (!model || !brand) return model;

  // \b tam söz kimi brand-i tapmaq üçün, case insensitive
  const brandRegex = new RegExp(`\\b${brand}\\b`, "i");

  if (brandRegex.test(model)) {
    return model.replace(brandRegex, "").replace(/\s+/g, " ").trim();
  }

  return model;
}
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function PostForm() {
  const [formState, setFormState] = useState({ category: "", images: [] });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [prefix, setPrefix] = useState("050");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/categories/full")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Kategoriya alınarkən xəta:", err));
  }, []);

  const selectedCategory = categories.find((cat) => cat.name === formState.category);
  const brands = selectedCategory?.brands.map((b) => b.name) || [];
  const models = selectedCategory?.brands.find((b) => b.name === formState.brand)?.models || [];

  const isAutoTitleCategory = (cat) => {
    return cat === "Telefon" || cat === "Noutbuk" || cat === "Oyun konsolları";
  };

  const handleChange = (field, value) => {
    setFormState((prev) => {
      let updated = { ...prev };

      if (field === "category") {
  if (prev.category === value) {
    return prev; // Eyni category seçilibsə, heç nə dəyişmə
  }

  return {
    category: value, // Yeni category
    // Digər sahələr sıfırlanır (yəni təmiz form)
  };
} else if (field === "brand") {
  updated.brand = value;

  // Əgər brand dəyişibsə, modeli sil
  if (prev.brand !== value) {
    delete updated.model;
  }

  // Avto başlıq generasiya
  if (isAutoTitleCategory(prev.category)) {
    const modelName = prev.brand === value ? prev.model : ""; // model varsa, istifadə et
    if (value && modelName) {
      updated.post_title = `${value} ${modelName}`;
    } else {
      updated.post_title = "";
    }
  }
} else if (field === "model") {
        let newModel = value;
        if (prev.brand) {
          // Modeldən brand adı silinir
          newModel = removeBrandFromModel(newModel, prev.brand);
        }
        // Bütün sözlərin ilk hərfi böyük edilir
        newModel = capitalizeWords(newModel);

        updated.model = newModel;

        if (isAutoTitleCategory(prev.category)) {
          if (prev.brand && newModel && formState.brand != "Digər") {
            updated.post_title = `${prev.brand} ${newModel}`;
          } else {
            updated.post_title = "";
          }
        }
      } else if (field === "images") {
        updated.images = value;
      } else {
        updated[field] = value;
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormState({ category: categoryId, images: [] });
    setErrors({});
  };

  const sendOtp = async () => {
    setLoading(true);
    const newErrors = {};
    if (!formState.category) newErrors.category = "Kateqoriya seçilməyib";
    if (!formState.brand) newErrors.brand = "Marka seçilməyib";
    if (!formState.model) newErrors.model = "Model seçilməyib";
    if (!formState.price) newErrors.price = "Qiymət boş ola bilməz";
    if (!formState.description) newErrors.description = "Açıqlama boş ola bilməz";
    if (!formState.contact) newErrors.contact = "Nömrə daxil edin";
    if (!formState.email || !isValidEmail(formState.email)) {
    newErrors.email = "Düzgün email daxil edin";
  }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3001/send-otp", {
        contact: `+994${prefix.slice(1)}${formState.contact}`,
      });
      toast.success("Təsdiq kodu nömrəyə göndərildi");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("OTP göndərilərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!otp) {
      setErrors({ otp: "OTP kodunu daxil edin" });
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      if (key === "images") {
        formState.images.forEach((file) => formData.append("images", file));
      } else if (key === "contact") {
        formData.append("contact", `+994${prefix.slice(1)}${formState.contact}`);
      } else if (key === "price") {
        formData.append("price", formState.price ? formState.price.toString() : "");
      } else if (Array.isArray(formState[key])) {
        formState[key].forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, formState[key]);
      }
    });

    formData.append("otp", otp);

    try {
      const res = await axios.post("http://localhost:3001/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Elan göndərildi!");
      setLoading(false);
      navigate(`/product/${res.data.post_id}`, {
        state: { toastMessage: "Elan uğurla əlavə olundu!" },
      });
    } catch (error) {
      setLoading(false);
      toast.error("Elan göndərilərkən xəta baş verdi.");
    }
  };

  const iconMap = {
    Telefon: <Smartphone className="text-blue-500" />,
    Kompuyter: <LaptopMinimal className="text-blue-500" />,
    Avtomobil: <CarFront className="text-blue-500" />,
  };

  return (
    <div className="flex flex-col gap-10 w-full pb-24 pt-[80px]">
      <PageHeader title="Yeni elan" />

      <div className="w-full flex justify-center">
        {step === 1 ? (
          <form className="flex flex-col w-[60%] max-w-full max-[599px]:w-11/12 gap-5">
            <SelectCategory
              label="Kateqoriya seçin"
              items={categories.map((cat) => cat.name)}
              title={formState.category || "Kateqoriya seçin"}
              onClick={(v) => handleChange("category", v)}
              selectedItem={formState.category}
              setSelectedItem={setSelectedItem}
            />

            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

            {formState.category && (
              <div className="flex flex-col gap-5">
                {fieldsConfig[selectedCategory?.name]?.map((field, index) => {
                  if (field.name === "make") {
                    return (
                      <div>
                      <SelectCategory
                        label="Marka"
                        key={index}
                        items={brands.sort((a, b) => {
  if (a === "Digər") return 1;        // a "Digər"dirsə, sona getsin
  if (b === "Digər") return -1;       // b "Digər"dirsə, a onun qabağına gəlsin
  return a.localeCompare(b, 'az', { sensitivity: 'base' }); // digərlər alfabetik
})}
                        title={formState.brand || "Marka"}
                        onClick={(v) => handleChange("brand", v)}
                         selectedItem={formState.brand}
                          setSelectedItem={setSelectedItem}
                      />
                              {errors.brand && (
    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
  )}
                      </div>
                    );
                  }
                  if (field.name === "model") {
                    return (
                      <div>
                      <HybridSelect
                        label="Model"
                        key={index}
                        options={models}
                        value={formState.model || ""}
                        disabled={!formState.brand}
                        onChange={(v) => handleChange("model", v)}
                      />
                              {errors.model && (
    <p className="text-red-500 text-sm mt-1">{errors.model}</p>
  )}
                      </div>
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
                  if (field.type === "number") {
                    return (
                      <Input
                        key={index}
                        type="number"
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
                   selectedItem={formState.city}
                          setSelectedItem={setSelectedItem}
                />
                        {errors.city && (
    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
  )}
                {formState.brand==="Digər" ?    <Input
                  type="text"
                  placeholder="Elan başlığı"
                  value={formState.post_title || ""}
                  onChange={(e) => handleChange("post_title", e.target.value)}
                /> : null}
                <Input
                  type="number"
                  placeholder="Qiymət"
                  value={formState.price || ""}
                  onChange={(e) => handleChange("price", Number(e.target.value))}
                />
                <Textarea
                  placeholder="Açıqlama"
                  value={formState.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                <MultiImageUpload
                  value={formState.images}
                  onChange={(files) => handleChange("images", files)}
                />
                <Input
                  type="text"
                  placeholder="Adınız"
                  value={formState.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <PhoneInput
                  prefix={prefix}
                  setPrefix={setPrefix}
                  contact={formState.contact || ""}
                  setContact={(val) => handleChange("contact", val)}
                />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                <Input
                  type="email"
                  placeholder="Email"
                  value={formState.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                        {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}

                <Button
                  text={loading ? <CircularProgress size={15} className="text-white" /> : "Elanı göndər"}
                  type="button"
                  onClick={sendOtp}
                />
              </div>
            )}
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[60%] max-w-full max-[599px]:w-11/12 gap-5"
          >
            <Input
              type="text"
              placeholder="OTP kodunu daxil edin"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
            <Button
              text={loading === true ? <CircularProgress size={15} className="text-white" /> : "Təsdiqlə"}
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
}
