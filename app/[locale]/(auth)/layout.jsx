"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

const AuthLayout = ({ children }) => {
  const t = useTranslations("Auth");
  const pathname = usePathname();
  const locale = useLocale();

  const isLogin = pathname.includes("/login");

  return (
    <>
    <Navbar />
    <div className="container min-h-screen mt-10 px-3">
      {/* Tab */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-100 border border-gray-200 rounded-full p-1 gap-1">
          <Link
            href={`/${locale}/login`}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-main to-secondary text-white shadow-lg shadow-main/30"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t("Login.title")}
          </Link>
          <Link
            href={`/${locale}/signup`}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-main to-secondary text-white shadow-lg shadow-main/30"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t("Signup.tabTitle")}
          </Link>
        </div>
      </div>

      {children}
    </div>
    </>
  );
};

export default AuthLayout;