import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PhoneInput from "../ui-components/PhoneInput";
import {toast} from "react-toastify"
import PageHeader from "../ui-components/PageHeader";
import Input from "../ui-components/Input";



const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export default function Login() {
  const { login, token } = useAuth();
const [email,setEmail]=useState("")
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/dashboard",{ replace: true });
    }
  }, [token]);

 const sendOtp = async () => {
  if (!isValidEmail(email)) return toast.error("Düzgün email daxil et");
  try {
    setLoading(true);
    await axios.post("https://backend-kmti.onrender.com/send-otp", { email: email });
    toast.success("Təsdiqləmə kodu email hesabına göndərildi!");
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
  
    const res = await axios.post("https://backend-kmti.onrender.com/verify-otp", {
  email:email,
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
   

     <div className="w-full bg-gray-50 p-2 max-[450px]:p-0 h-[100vh] flex flex-col items-center justify-center">
       <PageHeader title="Giriş et"/>
      <div className="w-auto bg-white max-[450px]:pt-[80px] max-[450px]:w-full max-[450px]:h-full">
        {step === 1 && (
        <div className="flex flex-col  bg-white rounded-[10px] gap-[20px] p-6 w-full">
          <Input
            type="text"
                placeholder="Email ünanınızı daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="bg-red-600 text-white p-3 rounded-[10px] mt-3"
          >
            {loading ? "Göndərilir..." : "OTP Göndər"}
          </button>
           <div className="w-full flex justify-center items-center p-6">
             <p>Hesabınız yoxdur? <Link to="/register" className="text-blue-600">Qeydiyyat</Link></p>
           </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-[20px] bg-white rounded-[10px] w-full p-6">
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
