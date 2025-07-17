import { useState, useEffect } from "react";
import axios from "axios";

import SelectCategory from "../ui-components/SelectCategory";
import Select from "../ui-components/Select";
import PageHeader from "../ui-components/PageHeader";
import Button from "../ui-components/Button";
import { fieldsConfig } from "../../data/fieldsconfig";
import { colorMap, locations } from "../../data/options";
import Input from "../ui-components/Input";
import MultiSelectCategory from "../ui-components/MultipleSelect";
import Textarea from "../ui-components/Textarea";
import MultiImageUpload from "../ui-components/ImageUpload";
import { CarFront, LaptopMinimal, Smartphone,Undo2 } from "lucide-react";

import PhoneInput from "../ui-components/PhoneInput";
import { Link, useNavigate } from "react-router-dom";

export default function PostForm() {
  const [formState, setFormState] = useState({ category: "", images: [] });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [prefix, setPrefix] = useState("050");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
const navigate=useNavigate()
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
      if (field === "images") {
        return { ...prev, images: value };
      }
      return { ...prev, [field]: value };
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormState({ category: categoryId, images: [] });
    setErrors({});
  };

  const sendOtp = async () => {
    const newErrors = {};
    if (!formState.category) newErrors.category = "Kateqoriya seçilməyib";
    if (!formState.post_title) newErrors.post_title = "Başlıq boş ola bilməz";
    if (!formState.price) newErrors.price = "Qiymət boş ola bilməz";
    if (!formState.description) newErrors.description = "Açıqlama boş ola bilməz";
    if (!formState.contact) newErrors.contact = "Nömrə daxil edin";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post("https://backend-kmti.onrender.com/send-otp", {
        contact: `+994${prefix.slice(1)}${formState.contact}`,
      });
      alert("OTP göndərildi");
      setStep(2);
    } catch (error) {
      console.error("OTP göndərmə xətası:", error);
      alert("OTP göndərilərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
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
    
      alert("Elan göndərildi!");
      navigate(`/product/${res.data.post_id}`, {
  state: { toastMessage: "Elan uğurla əlavə olundu!" },
});
    } catch (error) {
      console.error("Göndərmə xətası:", error);
      alert("Elan göndərilərkən xəta baş verdi.",{
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  toastClassName: "bg-green-600 text-white rounded-[7px]",
});
    }
  };

  const iconMap = {
    Telefon: <Smartphone className="text-blue-500" />,
    Kompuyter: <LaptopMinimal className="text-blue-500" />,
    Avtomobil: <CarFront className="text-blue-500" />,
  };

  return (
    <div className="flex flex-col gap-10 w-full pb-24 pt-[80px]">
    <PageHeader title="Ətraflı axtarış"/>

      <div className="w-full flex justify-center">
          <form className="flex flex-col w-[60%] max-w-full max-[599px]:w-11/12 gap-5">
           <SelectCategory items={categories.map(cat=>cat.name)} title="Kateqoriya seçin" onClick={(v) => handleChange("category", v)}/>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

            {formState.category && (
              <div className="flex flex-col gap-5  ">
                {fieldsConfig[selectedCategory?.name]?.map((field, index) => {
                  if (field.name === "make") {
                    return (
                      <SelectCategory key={index} items={brands} title={formState.brand || "Marka"} onClick={(v) => handleChange("brand", v)} />
                    );
                  }
                  if (field.name === "model") {
                    return (
                      <SelectCategory key={index} items={models} title={formState.model || "Model"} onClick={(v) => handleChange("model", v)} />
                    );
                  }
                  if (field.name === "supplies") {
                    return (
                      <MultiSelectCategory key={index} items={field.options} title={field.label} value={formState[field.name] || []} onChange={(v) => handleChange(field.name, v)} />
                    );
                  }
                  if (field.type === "select") {
                    return (
                      <SelectCategory key={index} items={field.options} title={formState[field.name] || field.label} onClick={(v) => handleChange(field.name, v)} {...(field.name === "color" ? { colorMap } : {})} />
                    );
                  }
                  if (field.type === "text") {
                    return (
                      <Input key={index} type="text" placeholder={field.label} value={formState[field.name] || ""} onChange={(e) => handleChange(field.name, e.target.value)} />
                    );
                  }
                  return null;
                })}

                <SelectCategory items={locations} title={formState.city || "Şəhər"} onClick={(v) => handleChange("city", v)} />
              <div className="flex gap-[15px]">
                  <Input type="number" placeholder="Min qiymət" value={formState.minPrice || ""} onChange={(e) => handleChange("minprice", e.target.value)} />
                    <Input type="number" placeholder="Max qiymət" value={formState.maxPrice || ""} onChange={(e) => handleChange("maxprice", e.target.value)} />
              </div>

                <Button text="Axtar" type="button" onClick={sendOtp} />
              </div>
            )}
          </form>
      </div>
    </div>
  );
}
