"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import SectionHeader from "../SectionHeader";
import CTAButton from "../CTAButton";

const Hero = () => {
  const t = useTranslations("LandingPage.Hero");
  const locale = useLocale();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container my-14 md:my-20 text-center space-y-3 md:space-y-5">
      <SectionHeader
          title={t.rich("title", {
            gradient: (chunks) => (
              <span className="text-transparent bg-clip-text bg-gradient-to-l to-main from-secondary">
                {chunks}
              </span>
            ),
          })}
          description={t("description")}
          titleClassName="text-main"
        />

      <CTAButton label={t("btn")} />

      <div className="w-full mx-auto mt-12 px-3 md:px-6 lg:px-0">
        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl">
          <Image
            src={locale === "ar" ? "/hero-img-ar.png" : "/hero-img-en.png"}
            alt="واجهة مستخدم المنصة الذكية"
            width={1200}
            height={200}
            priority
            className="rounded-xl w-full h-auto md:h-[640px] object-cover object-[0%_35%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
