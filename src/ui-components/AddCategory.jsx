import React, { useEffect, useState } from "react";
import axios from "axios";
export default function CategoryForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newModelName, setNewModelName] = useState("");

  // Backend URL (backend’in çalıştığı adres)
  const API_URL = "http://localhost:3001/categories";

  // Kategorileri çek
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

const addCategory = async () => {
  if (!newCategoryName.trim()) return alert("Kategori adı boş olamaz");

  try {
    const res = await axios.post("http://localhost:3001/categories", {
      name: newCategoryName,
    });

    // Başarılıysa state güncelle
    setCategories((prev) => [...prev, res.data]);
    setNewCategoryName("");
  } catch (error) {
    // Hata varsa mesaj göster
    const message = error.response?.data?.message || "Hata oluştu";
    alert(message);
  }
};


  // Marka ekle
 const addBrand = async () => {
  if (!selectedCategoryId) return alert("Önce kategori seç");
  if (!newBrandName.trim()) return alert("Marka adı boş olamaz");

  try {
    const res = await axios.post(
      `http://localhost:3001/${selectedCategoryId}/brands`,
      { brandName: newBrandName }
    );

    // Yeni marka eklendi, categories'i güncelle
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === selectedCategoryId ? res.data : cat
      )
    );

    setNewBrandName("");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Hata oluştu");
  }
};

  // Model ekle
  const addModel = async () => {
  if (!selectedCategoryId) return alert("Önce kategori seç");
  if (!selectedBrandId) return alert("Önce marka seç");
  if (!newModelName.trim()) return alert("Model adı boş olamaz");

  try {
    const res = await axios.post(
      `http://localhost:3001/${selectedCategoryId}/brands/${selectedBrandId}/models`,
      { modelName: newModelName }
    );

    // Yeni model eklendi, categories'i güncelle
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === selectedCategoryId ? res.data : cat
      )
    );

    setNewModelName("");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Hata oluştu");
  }
};

  // Seçili kategori objesi
  const selectedCategory = categories.find(c => c._id === selectedCategoryId);
  // Seçili marka objesi
  const selectedBrand = selectedCategory?.brands.find(b => b._id === selectedBrandId);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-8">
      <h1 className="text-2xl font-bold mb-4">Kategori / Marka / Model Ekle</h1>

      {/* Kategori seç ve ekle */}
      <div className="flex flex-col gap-[10px]">
        <label className="block font-semibold mb-1">Kategori Seç</label>
        <select
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          value={selectedCategoryId}
          onChange={(e) => {
            setSelectedCategoryId(e.target.value);
            setSelectedBrandId("");
          }}
        >
          <option value="">Kategori Seç</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none  focus:ring-opacity-20"
          placeholder="Yeni kategori adı"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kategori Ekle
        </button>
      </div>

      {/* Marka seç ve ekle */}
      <div className="flex flex-col gap-[10px]">
        <label className="block font-semibold mb-1">Marka Seç</label>
        <select
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          value={selectedBrandId}
          onChange={(e) => setSelectedBrandId(e.target.value)}
          disabled={!selectedCategoryId}
        >
          <option value="">Marka Seç</option>
          {selectedCategory?.brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none  focus:ring-opacity-20"
          placeholder="Yeni marka adı"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          disabled={!selectedCategoryId}
        />
        <button
          onClick={addBrand}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!selectedCategoryId}
        >
          Marka Ekle
        </button>
      </div>

      {/* Model seç ve ekle */}
      <div className="flex flex-col gap-[10px]">
        <label className="block font-semibold mb-1">Model Ekle</label>
        <input
          type="text"
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none  focus:ring-opacity-20"
          placeholder="Yeni model adı"
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
          disabled={!selectedBrandId}
        />
        <button
          onClick={addModel}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={!selectedBrandId}
        >
          Model Ekle
        </button>
      </div>
    </div>
  );
}
