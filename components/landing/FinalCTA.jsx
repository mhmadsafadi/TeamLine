import { useTranslations } from "next-intl";
import SectionHeader from "../SectionHeader";
import CTAButton from "../CTAButton";

const FinalCTA = () => {
  const t = useTranslations("LandingPage.FinalCTA");

  return (
    <section className="bg-white px-4 pb-16 pt-5">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-r from-secondary/20 via-white to-main/20 px-6 py-16 text-center shadow-xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-full bg-gradient-to-tr from-main/35 via-cyan-200/25 to-secondary/30 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <SectionHeader
              label={t("label")}
              title={t("title")}
              description={t("description")}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <CTAButton label={t("button")} />
              <p className="text-sm font-medium text-gray-500">{t("note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
