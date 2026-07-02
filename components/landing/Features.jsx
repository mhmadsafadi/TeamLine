import { useTranslations } from "next-intl";
import SectionHeader from "../SectionHeader";

const Features = () => {
  const t = useTranslations("LandingPage.Features");
  const features = ["boards", "ownership", "progress", "bilingual"];

  return (
    <section className="mt-10 py-10 bg-linear-to-r from-secondary/50 to-main/75">
      <div className="container text-center px-3">
        <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
            labelClassName="text-white"
            titleClassName="text-white"
            descriptionClassName="text-gray-100"
        />

         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-white/70 bg-white/55 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-main">
                {t(`items.${key}.title`)}
              </h3>

              <p className="mt-3 text-md leading-7 text-gray-600">
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
