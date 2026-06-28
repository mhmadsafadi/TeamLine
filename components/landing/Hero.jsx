"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const Hero = () => {
  const t = useTranslations("LandingPage.Hero");
  const locale = useLocale();
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container my-14 md:my-20 text-center space-y-3 md:space-y-5">
      <h1 className="text-3xl font-bold text-heading md:text-4xl lg:text-5xl text-main">
        {t.rich("title", {
          gradient: (chunks) => (
            <span className="text-transparent bg-clip-text bg-gradient-to-l to-main from-secondary">
              {chunks}
            </span>
          ),
        })}
      </h1>
      <p className="text-lg md:text-2xl">{t("description")}</p>

      <Link
        href={user ? `/${locale}/dashboard` : `/${locale}/signup`}
        className="mx-auto group bg-main text-white py-3 px-5 rounded-lg text-lg flex items-center w-fit gap-2 transition-shadow duration-3 hover:shadow-lg shadow-main/40"
      >
        <span>{t("btn")}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform duration-300 ${locale === "ar" ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
        >
          {locale === "ar" ? (
            <path d="M19 12H5M12 19l-7-7 7-7" />
          ) : (
            <path d="M5 12h14M12 5l7 7-7 7" />
          )}
        </svg>
      </Link>

      <div className="w-full mx-auto mt-12 px-2 md:px-6 lg:px-0">
        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl">
          <Image
            src={locale === "ar" ? "/hero-img-ar.png" : "/hero-img-en.png"}
            alt="واجهة مستخدم المنصة الذكية"
            width={1200}
            height={200}
            priority
            className="rounded-xl w-full h-auto md:h-[800px] object-cover object-[0%_35%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
