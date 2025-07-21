import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../ui-components/PageHeader";
import Statistic from "./profile-pages/Statistics";
import Loader from "../ui-components/Loader";
import Myposts from "./profile-pages/MyPosts";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://backend-kmti.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href("/"); // Refresh page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh] lg:mt-[-50px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Profil" />
      <div className="w-full min-h-[100vh] backdrop-blur-lg pb-[60px] pt-[50px]">
        <div className="bg-white overflow-hidden min-h-[100vh] noscroll">
          {/* Header */}
          <div className="bg-white p-6 text-white">
            <div className="text-center">
              <img
                src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-9.jpg"
                alt="Profil Resmi"
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-3 border-white"
              />
              <h2 className="text-xl font-bold text-black/30">{user?.name}</h2>
              <p className="text-sm text-black/50">{user?.email}</p>
              <p className="text-sm text-black/50">{user?.contact}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-2 py-4 flex">
            <div className="grid grid-cols-4 gap-2 text-xs w-full">
              <button
                onClick={() => setActiveTab(1)}
                className={`p-3 ${
                  activeTab === 1 ? "bg-teal-50" : "bg-white"
                } hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}
              >
                Statistika
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`p-3 ${
                  activeTab === 2 ? "bg-teal-50" : "bg-white"
                } hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}
              >
                Elanlarım
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`p-3 ${
                  activeTab === 3 ? "bg-teal-50" : "bg-white"
                } hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}
              >
                Ödənişlər
              </button>
              <button
                onClick={() => setShowLogoutModal(true)}
                className={`p-3 ${
                  activeTab === 4 ? "bg-teal-50" : "bg-white"
                } hover:bg-gray-50 text-teal-600 rounded-lg font-medium text-center`}
              >
                Çıxış
              </button>
            </div>
          </div>

          {/* Tabs */}
          {activeTab === 1 && <Statistic />}
          {activeTab === 2 && <Myposts />}
          {/* activeTab === 3 üçün hissə əlavə edə bilərsən */}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// Modal komponenti
function LogoutModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl text-center">
        <h2 className="text-md font-small mb-4">Çıxış etmək istədiyinizə əminsiniz?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Ləğv et
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Bəli
          </button>
        </div>
      </div>
    </div>
  );
}
