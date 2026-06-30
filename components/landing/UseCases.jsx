import { useTranslations } from "next-intl";
import SectionHeader from "../SectionHeader";
import UseCaseCard from "./UseCaseCard";

const items = [
  {
    key: "design",
    className: "md:col-span-7 bg-secondary/10",
    accent: "bg-secondary",
    visual: "design",
  },
  {
    key: "software",
    className: "md:col-span-5 bg-main/10",
    accent: "bg-main",
    visual: "software",
  },
  {
    key: "marketing",
    className: "md:col-span-5 bg-sky-400/10",
    accent: "bg-sky-400",
    visual: "marketing",
  },
  {
    key: "students",
    className: "md:col-span-7 bg-emerald-400/10",
    accent: "bg-emerald-400",
    visual: "students",
  },
];

const UseCases = () => {
  const t = useTranslations("LandingPage.UseCases");

  return (
    <section className="relative overflow-hidden bg-white py-24 px-3">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-full bg-gradient-to-tr from-secondary/25 via-cyan-200/20 to-main/25 blur-[110px]" />
      </div>

      <div className="container relative">
        <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-12">
          {items.map((item) => (
            <UseCaseCard
              key={item.key}
              item={item}
              title={t(`items.${item.key}.title`)}
              description={t(`items.${item.key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
