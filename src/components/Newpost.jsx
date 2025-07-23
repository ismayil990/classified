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
import { CarFront, LaptopMinimal, Loader, Smartphone } from "lucide-react";
import PhoneInput from "../ui-components/PhoneInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import HybridSelect from "../ui-components/HybridSelect";

export default function PostForm() {
  const [formState, setFormState] = useState({ category: "", images: [] });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [prefix, setPrefix] = useState("050");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading,setLoading]=useState(false)

const navigate=useNavigate()
  useEffect(() => {
    axios.get("https://backend-kmti.onrender.com/categories/full")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Kategoriya alınarkən xəta:", err));
  }, []);


  const selectedCategory = categories.find((cat) => cat.name === formState.category);
  const brands = selectedCategory?.brands.map((b) => b.name) || [];
  const models = selectedCategory?.brands.find((b) => b.name === formState.brand)?.models || [];


  const isAutoTitleCategory = (cat) => {
  // Avtomatik başlıq qurmaq istədiyin kateqoriyaları əlavə et
  return cat === "Smartfon" || cat === "Noutbuk";
};

const handleChange = (field, value) => {
  setFormState((prev) => {
    let updated = { ...prev };

    if (field === "category") {
      updated.category = value;
      delete updated.brand;
      delete updated.model;
      updated.post_title = ""; // Reset başlıq
    } else if (field === "brand") {
      updated.brand = value;
      delete updated.model;

      if (isAutoTitleCategory(prev.category)) {
        if (value && prev.model) {
          updated.post_title = `${value} ${prev.model}`;
        } else {
          updated.post_title = "";
        }
      }
    } else if (field === "model") {
      updated.model = value;

      if (isAutoTitleCategory(prev.category)) {
        if (prev.brand && value) {
          updated.post_title = `${prev.brand} ${value}`;
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
    setLoading(true)
    const newErrors = {};
    if (!formState.category) newErrors.category = "Kateqoriya seçilməyib";
    if (!formState.post_title && formState.category !== "Telefon")
    newErrors.post_title = "Başlıq boş ola bilməz";
    if (!formState.price) newErrors.price = "Qiymət boş ola bilməz";
    if (!formState.description) newErrors.description = "Açıqlama boş ola bilməz";
    if (!formState.contact) newErrors.contact = "Nömrə daxil edin";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post("https://backend-kmti.onrender.com/send-otp", {
        contact: `+994${prefix.slice(1)}${formState.contact}`,
      });
      toast.success("Təsdiq kodu nömrəyə göndərildi");
      setStep(2);
      setLoading(false)
    } catch (error) {
setLoading(false)
      toast.error("OTP göndərilərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true)
  e.preventDefault();

  if (!otp) {
    setErrors({ otp: "OTP kodunu daxil edin" });
    return;
  }

  const formData = new FormData();

  Object.keys(formState).forEach((key) => {
    if (key === "images") {
      formState.images.forEach((file) => formData.append("images", file));
    } else if (key === "contact") {
      formData.append("contact", `+994${prefix.slice(1)}${formState.contact}`);
    } else if (key === "price") {
      // Price'ı burada Number-a çeviririk, amma FormData-da hər şey string olur, buna görə backend-də də çevirmə olmalıdır
      formData.append("price", formState.price ? formState.price.toString() : "");
    } else if (Array.isArray(formState[key])) {
      formState[key].forEach((val) => formData.append(key, val));
    } else {
      formData.append(key, formState[key]);
    }
  });

  formData.append("otp", otp);

  try {
    const res = await axios.post("https://backend-kmti.onrender.com/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Elan göndərildi!");
    setLoading(false)
    navigate(`/product/${res.data.post_id}`, {
      state: { toastMessage: "Elan uğurla əlavə olundu!" },
    });
  } catch (error) {
    setLoading(false)
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
         <SelectCategory label="Kateqoriya seçin" items={categories.map(cat=>cat.name)} title={formState.category || "Kateqoriya seçin"} onClick={(v) => handleChange("category", v)}/>
           
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

            {formState.category && (
              <div className="flex flex-col gap-5  ">
                {fieldsConfig[selectedCategory?.name]?.map((field, index) => {
                  if (field.name === "make") {
                    return (
                      <SelectCategory label="Marka" key={index} items={brands} title={formState.brand || "Marka"} onClick={(v) => handleChange("brand", v)} />
                    );
                  }
                  if (field.name === "model") {
                    return (
                      <HybridSelect label="Model" key={index} options={models} title={formState.model || "Model"} onChange={(v) => handleChange("model", v)} />
                    );
                  }
              
                  if (field.type === "select") {
                    return (
                      <SelectCategory label={field.label} key={index} items={field.options} title={formState[field.name] || field.label} onClick={(v) => handleChange(field.name, v)} {...(field.name === "color" ? { colorMap } : {})} />
                    );
                  }
                  if (field.type === "text") {
                    return (
                      <Input key={index} type="text" placeholder={field.label} value={formState[field.name] || ""} onChange={(e) => handleChange(field.name, e.target.value)} />
                    );
                  };
                    if (field.type === "number") {
                    return (
                      <Input key={index} type="number" placeholder={field.label} value={formState[field.name] || ""} onChange={(e) => handleChange(field.name, e.target.value)} />
                    );
                  }
                  return null;
                })}

                <SelectCategory label="Şəhər" items={locations} title={formState.city || "Şəhər"} onClick={(v) => handleChange("city", v)} />
                <Input type="number" placeholder="Qiymət" value={formState.price || ""} onChange={(e) => handleChange("price", Number(e.target.value))} />
                <Textarea placeholder="Açıqlama" value={formState.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
                <MultiImageUpload value={formState.images} onChange={(files) => handleChange("images", files)} />
                <Input type="text" placeholder="Adınız" value={formState.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
                <PhoneInput prefix={prefix} setPrefix={setPrefix} contact={formState.contact || ""} setContact={(val) => handleChange("contact", val)} />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                <Input type="email" placeholder="Email" value={formState.email || ""} onChange={(e) => handleChange("email", e.target.value)} />

                <Button text={loading ? <CircularProgress size={15} className="text-white"/> : "Elanı göndər"} type="button" onClick={sendOtp} />
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col w-[60%] max-w-full max-[599px]:w-11/12 gap-5">
            <Input type="text" placeholder="OTP kodunu daxil edin" value={otp} onChange={(e) => setOtp(e.target.value)} />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
            <Button text={loading === true ? <CircularProgress size={15} className="text-white"/> :"Təsdiqlə"} type="submit" />
          </form>
        )}
      </div>
    </div>
  );
}
