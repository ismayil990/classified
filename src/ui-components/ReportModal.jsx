import React, { useState } from "react"
import { toast } from "react-toastify"

export default function ReportModal({ isOpen, onClose, postId }) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [loading, setLoading] = useState(false)

  const reasons = [
    "Yalan məlumat",
    "Təhqiredici məzmun",
    "Dublikat elan",
    "Qaydaların pozulması",
    "Digər"
  ]

  const handleSubmit = async () => {
    const finalReason = reason === "Digər" ? customReason : reason
    if (!finalReason) {
      toast.warning("Zəhmət olmasa səbəb seçin və ya yazın")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("http://localhost:3001/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reason: finalReason }),
      })

      if (res.ok) {
        toast.success("Şikayətiniz qəbul edildi")
        onClose()
        setReason("")
        setCustomReason("")
      } else {
        toast.error("Şikayət göndərilə bilmədi")
      }
    } catch (err) {
      console.error("Şikayət xətası:", err)
      toast.error("Xəta baş verdi")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg max-w-sm w-full text-white max-[391px]:w-full max-[391px]:h-full">
        <h2 className="text-lg font-semibold mb-4">Şikayət et</h2>
        <p className="mb-4 text-sm text-gray-300">Zəhmət olmasa şikayət səbəbini seçin:</p>

        <div className="flex flex-col gap-2">
          {reasons.map((r) => (
            <label key={r} className="flex items-center space-x-2">
              <input
                type="radio"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
                className="accent-red-500"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>

        {reason === "Digər" && (
          <input
            type="text"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Şikayət səbəbini yazın..."
            className="w-full mt-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 outline-none"
          />
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Ləğv et
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Göndərilir..." : "Təsdiqlə"}
          </button>
        </div>
      </div>
    </div>
  )
}
