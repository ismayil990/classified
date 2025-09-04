// src/components/Register.jsx
import { useState,useEffect } from "react";
import Input from "../ui-components/Input";
import PhoneInput from "../ui-components/PhoneInput";
import Button from "../ui-components/Button";
import axios from "axios";
import PageHeader from "../ui-components/PageHeader";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation} from "react-router-dom";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Register() {
    const { login, token } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [prefix, setPrefix] = useState("050");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && location.pathname === "/register") {
      navigate("/dashboard");
    }
  }, [token, navigate, location.pathname]);
  // Step 1: OTP göndər
  const handleSendOtp = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Ad daxil edin";
    if (!contact) newErrors.contact = "Nömrə daxil edin";
    if (!email || !isValidEmail(email)) {
      newErrors.email = "Düzgün email daxil edin";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      await axios.post("https://backend-kmti.onrender.com/send-otp-email", { email,contact:`+994${prefix.slice(1)}${contact}` });
      setStep(2);
      setMessage("OTP kodu email ünvanınıza göndərildi.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "OTP göndərilə bilmədi, yenidən yoxlayın."
      );
    } finally {
      setLoading(false);
    }
  };

 
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setErrors({ otp: "OTP daxil edin" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://backend-kmti.onrender.com/verify-otp-email", {
        email,
        otp,
        name,
        contact: `+994${prefix.slice(1)}${contact}`,
      });

      setMessage("Qeydiyyat uğurludur 🎉");
      login(res.data.token)
      navigate("/dashboard");
      console.log("User token:", res.data.token);
     
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP doğrulama uğursuz oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="w-full bg-gray-50 p-2 max-[450px]:p-0 h-[100vh] flex flex-col items-center justify-center">
        <PageHeader title="Qeydiyyat"/>
        <div className="w-auto max-[450px]:w-full max-[450px]:h-full">

        {message && (
          <div className="mb-4 text-sm text-blue-600">{message}</div>
        )}

        {step === 1 && (
          <form
            onSubmit={handleSendOtp}
            className="bg-white border border-gray-200  rounded-[10px] p-6 max-[450px]:p-4 max-[450px]:h-full max-[450px]:border-0 max-[450px]:rounded-0 max-[450px]:pt-[80px]"
          >

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Adınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

      
            <div className="mb-4">
              <PhoneInput
                prefix={prefix}
                setPrefix={setPrefix}
                contact={contact}
                setContact={(value) => setContact(value)}
              />
              {errors.contact && (
                <p className="text-xs text-red-500 mt-1">{errors.contact}</p>
              )}
            </div>

         
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Email ünvanı"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <Button type="submit" text={loading ? "Göndərilir..." : "Kod Göndər"} />

           <div className="w-full flex justify-center items-center p-6">
             <p>Hesabınız var? <Link to="/login" className="text-blue-600">Giriş et</Link></p>
           </div>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleVerifyOtp}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
          
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Təsdiqləmə Kodu
              </label>
              <Input
                type="text"
                placeholder="Kodu daxil edin"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && (
                <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
              )}
            </div>

            <Button
              type="submit"
              text={loading ? "Yoxlanılır..." : "Təsdiqlə"}
            />
          </form>
        )}
      </div>
      </div>
  
  );
}
