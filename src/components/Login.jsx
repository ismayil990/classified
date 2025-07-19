import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "../ui-components/PhoneInput"; // komponent yolunu uyğunlaşdır
import {toast} from "react-toastify"
import PageHeader from "../ui-components/PageHeader";
export default function Login() {
  const { login, token } = useAuth();
  const [prefix, setPrefix] = useState("050");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [token, navigate, location.pathname]);

 const sendOtp = async () => {
  if (!contact) return toast.error("Nömrəni daxil et");
  try {
    setLoading(true);
    const fullContact = `+994${prefix.slice(1)}${contact}`;
    await axios.post("https://backend-kmti.onrender.com/send-otp-number", { contact: fullContact });
    toast.success("OTP göndərildi!");
    setStep(2);
  } catch (err) {
    toast.error(err.response?.data?.message || "Xəta baş verdi");
  } finally {
    setLoading(false);
  }
};

const verifyOtp = async () => {
  if (!otp) return alert("OTP-ni daxil et");
  try {
    setLoading(true);
    const fullContact = `+994${prefix.slice(1)}${contact}`;
    const res = await axios.post("https://backend-kmti.onrender.com/verify-otp", {
      contact: fullContact,
      otp,
    });
    login(res.data.token);
    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Xəta baş verdi");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col gap-5 w-full">
  <PageHeader title="Giriş et"/>

     <div className="flex flex-col items-center justify-center gap-[20px] pt-[90px]">
       {step === 1 && (
        <div className="flex flex-col gap-[20px]">
        <h2 className="text-[15px] text-gray-400 font-bold text-center">Mobil nömrənizi daxil edin</h2>
          <PhoneInput
            prefix={prefix}
            setPrefix={setPrefix}
            contact={contact}
            setContact={setContact}
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="bg-red-600 text-white p-3 rounded-[10px] mt-3"
          >
            {loading ? "Göndərilir..." : "OTP Göndər"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-[20px]">
        <h2 className="text-[15px] text-gray-400 font-bold text-center">Təsdiqləmə kodunu daxil edin</h2>
          <input
            type="text"
            placeholder="OTP kod"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none"
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="bg-red-600 text-white p-2 rounded-[7px]"
          >
            {loading ? "Yoxlanır..." : "Daxil Ol"}
          </button>
        </div>
      )}
     </div>
    </div>
  );
}
