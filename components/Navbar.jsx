"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LangToggle } from "./LangToggle";
import { useEffect } from "react";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="bg-white/5 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-2 sm:px-0">
        <Logo />
        <div className="flex gap-3 items-center">
          <LangToggle />
          {user ? (
            <Link
              href={`/${locale}/dashboard`}
              className="flex items-center text-sm md:text-base gap-1.5 px-2 md:px-5 py-2 bg-main text-white hover:bg-main/10 hover:text-main rounded-md transition"
            >
              {t("dashboard")}
              <svg
                width={18}
                height={18}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                />
              </svg>
            </Link>
          ) : (
            <Link
              href="/signup"
              className="flex items-center text-sm md:text-base gap-1.5 px-2 md:px-5 py-2 bg-main text-white hover:bg-main/10 hover:text-main rounded-md transition"
            >
              {t("signup")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
