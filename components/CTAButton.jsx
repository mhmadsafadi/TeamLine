"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useAuthStore } from "@/store/authStore";

const CTAButton = ({ label }) => {
  const locale = useLocale();
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Link
      href={user ? `/${locale}/dashboard` : `/${locale}/signup`}
      className="mx-auto group bg-main text-white py-3 px-5 rounded-lg text-lg flex items-center w-fit gap-2 transition-shadow duration-300 hover:shadow-lg shadow-main/40"
    >
      <span>{label}</span>
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
        className={`transform transition-transform duration-300 ${
          locale === "ar"
            ? "group-hover:-translate-x-2"
            : "group-hover:translate-x-2"
        }`}
      >
        {locale === "ar" ? (
          <path d="M19 12H5M12 19l-7-7 7-7" />
        ) : (
          <path d="M5 12h14M12 5l7 7-7 7" />
        )}
      </svg>
    </Link>
  );
};

export default CTAButton;
