import PageHeader from "../ui-components/PageHeader";


export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
    <PageHeader title="İstifadəçi Razılaşması və Qaydalar"/>

      <p className="mb-4 text-gray-600 pt-[50px]">
        Aşağıdakı şərtlər və qaydalar <strong>mobi-x.az</strong> saytının istifadəsini tənzimləyir. Sayta daxil olmaqla və xidmətlərimizdən istifadə etməklə bu şərtləri qəbul etmiş sayılırsınız.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Ümumi şərtlər</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Sayt yalnız hüquqi və etik məqsədlərlə istifadə olunmalıdır.</li>
          <li>İstifadəçilər yerləşdirdikləri elanların düzgünlüyünə və qanunlara uyğun olmasına görə məsuliyyət daşıyırlar.</li>
          <li>Qadağan olunmuş məhsulların satışı və ya reklamı qəti qadağandır.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Elan yerləşdirmə qaydaları</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Yalnız real və mövcud olan məhsullar üçün elan yerləşdirilə bilər.</li>
          <li>Bir məhsul üçün bir neçə təkrar elan yerləşdirmək qadağandır.</li>
          <li>Şəkillər məhsula uyğun və keyfiyyətli olmalıdır.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Məsuliyyətin məhdudlaşdırılması</h2>
        <p className="text-gray-600">
          <strong>mobi-x.az</strong> saytında yerləşdirilən elanların düzgünlüyünə görə məsuliyyət daşımır. Sayt yalnız vasitəçi rolunu oynayır və istifadəçilər arasında baş verən razılaşmalara qarışmır.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Şəxsi məlumatların qorunması</h2>
        <p className="text-gray-600">
          İstifadəçilərin təqdim etdiyi şəxsi məlumatlar yalnız daxili məqsədlərlə istifadə olunur və heç bir halda üçüncü şəxslərlə paylaşılmır.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Qaydaların dəyişdirilməsi</h2>
        <p className="text-gray-600">
          <strong>mobi-x.az</strong> istənilən vaxt bu qaydaları dəyişmək hüququnu özündə saxlayır. Yenilənmiş qaydalar sayt üzərində yayımlandığı andan etibarən qüvvəyə minir.
        </p>
      </section>

      <div className="mt-10 text-center text-gray-600">
        <p>Əgər bu qaydalarla bağlı sualınız varsa, <a href="/elaqe" className="text-red-600 underline">bizimlə əlaqə</a> saxlayın.</p>
      </div>
    </div>
  );
}
