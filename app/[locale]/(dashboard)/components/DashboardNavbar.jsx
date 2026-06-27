"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LangToggle } from "@/components/LangToggle";

export const DashboardNavbar = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = useTranslations("Dashboard.navbar");
  const locale = useLocale();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5">
        <div className="flex items-center justify-between">

          {/* يسار — زر toggle + Logo */}
          <div className="flex items-center justify-start rtl:justify-end gap-2">
            <button
              onClick={onMenuClick}
              type="button"
              className="sm:hidden text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h10"/>
              </svg>
            </button>

            <Link href={`/${locale}`} className="flex flex-col items-center ms-2">
              <Image src="/logo-1.png" alt="TeamLine" width={100} height={80} priority />
              <span className="text-xs font-semibold tracking-widest text-main">TeamLine</span>
            </Link>
          </div>

          {/* يمين — LangToggle + User dropdown */}
          <div className="flex items-center gap-3">
            <LangToggle />

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 cursor-pointer transition"
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold">
                  م
                </div>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <>
                  {/* overlay */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute end-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-800">محمد</p>
                      <p className="text-xs text-gray-500 truncate">mohammed@email.com</p>
                    </div>
                    <ul className="p-2 text-sm text-gray-600">
                      <li>
                        <Link
                          href={`/${locale}/dashboard`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-main transition"
                        >
                          {t("profile")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/settings`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-main transition"
                        >
                          {t("settings")}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition text-start"
                        >
                          {t("signout")}
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};