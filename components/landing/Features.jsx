import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("LandingPage.Features");
  const features = ["boards", "ownership", "progress", "bilingual"];

  return (
    <section className="mt-10 py-10 bg-linear-to-r from-secondary/50 via-gray-50 to-main/75">
      <div className="container text-c px-3 sm:px-0">
        <div className="mb-7 text-white">
          {/* <h1 className="text-3xl font-bold mb-3 rtl:text-secondary ltr:text-main">{t("label")}</h1> */}
          <h2 className="text-2xl ">{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-main">
                {t(`items.${key}.title`)}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
