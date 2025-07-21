import PageHeader from "../ui-components/PageHeader";


export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
     <PageHeader title="Haqqımızda"/>

      <p className="mb-6 text-lg leading-relaxed text-gray-600 pt-[50px]">
        <strong>Mobi-x.az</strong> – Azərbaycanda telefon və kompüter elanlarının paylaşılması üçün yaradılmış müasir və istifadəsi asan bir platformadır.
        Məqsədimiz, texnologiya məhsullarını almaq və satmaq istəyən insanları bir araya gətirməkdir.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Niyə bizi seçməlisiniz?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Sadə və sürətli elan yerləşdirmə sistemi</li>
            <li>Mobil və kompüter kateqoriyalarına fokuslanmış platforma</li>
            <li>Real istifadəçilərlə birbaşa əlaqə imkanı</li>
            <li>Modern dizayn və rahat istifadəçi təcrübəsi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Missiyamız</h2>
          <p className="text-gray-600">
            Biz, Azərbaycanda texnoloji məhsulların təhlükəsiz və effektiv şəkildə alış-satışına kömək etməyi hədəfləyirik.
            İstifadəçilər üçün şəffaf və güvənli bir mühit yaratmaq əsas prioritetimizdir.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Daha ətraflı məlumat və suallarınız üçün bizimlə <a href="/elaqe" className="text-red-600 underline">əlaqə</a> saxlayın.
        </p>
      </div>
    </div>
  );
}
