import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../ui-components/PageHeader";

export default function Terms() {
  const [termsHtml, setTermsHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/terms")
      .then(res => {
        if (res.data?.terms) {
          setTermsHtml(res.data.terms);
        }
        console.log(res.data.terms)
      })
      .catch(err => {
        console.error("Terms alınmadı:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Yüklənir...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <PageHeader title="İstifadəçi Razılaşması və Qaydalar" />

      <div
        className="prose max-w-none p-4 pt-[30px]"
        dangerouslySetInnerHTML={{ __html: termsHtml }}
      />
    </div>
  );
}
