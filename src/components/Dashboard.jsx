import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-20">
      <h1 className="text-3xl font-bold">Salam, sistemdəsən!</h1>
      <p className="text-gray-600">Token: <span className="text-blue-600 break-all">{token}</span></p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Çıxış et
      </button>
    </div>
  );
}
