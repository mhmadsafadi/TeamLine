import { useTranslations } from "next-intl";
import SectionHeader from "../SectionHeader";

const icons = {
  team: (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <path
        d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 20c.8-3 3.5-5 7.5-5s6.7 2 7.5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3l2 2h6A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 15h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  tasks: (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <path
        d="M5 12.5 9 16l10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12a8 8 0 1 1-3-6.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const steps = ["team", "project", "tasks"];

const HowItWorks = () => {
  const t = useTranslations("LandingPage.HowItWorks");

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-full bg-gradient-to-tr from-main/35 via-cyan-200/25 to-secondary/30 blur-[110px]" />
      </div>

      <div className="container relative px-3 md:px-0">
        <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
            labelClassName="text-main"
            titleClassName="text-black"
            descriptionClassName="text-gray-600"
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-main/0 via-main/30 to-secondary/0 md:block" />

          <div className="space-y-10">
            {steps.map((key, index) => (
              <div
                key={key}
                className={`relative grid gap-6 md:grid-cols-2 md:items-center ${
                  index % 2 === 1 ? "md:[&>div:first-child]:col-start-2" : ""
                }`}
              >
                <div className="relative rounded-2xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-main/10 text-main ring-1 ring-main/10">
                      {icons[key]}
                    </div>

                    <span className="bg-gradient-to-r from-main to-secondary bg-clip-text text-4xl font-black text-transparent">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950">
                    {t(`steps.${key}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>

                <div className="absolute left-1/2 top-6 hidden size-5 -translate-x-1/2 rounded-full border-4 border-white bg-main shadow-[0_0_0_6px_rgba(99,75,255,0.12)] md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
