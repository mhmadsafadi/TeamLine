"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Dashboard.sidebar");

  const isActive = (path) => pathname.includes(path);

  const navItems = [
    {
      href: `/${locale}/dashboard`,
      label: t("dashboard"),
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/>
        </svg>
      ),
    },
    {
      href: `/${locale}/projects`,
      label: t("projects"),
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
        </svg>
      ),
    },
    {
      href: `/${locale}/tasks`,
      label: t("tasks"),
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m-9.5 8H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/>
        </svg>
      ),
    },
    {
      href: `/${locale}/team`,
      label: t("team"),
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
      ),
    },
  ];

  const bottomItems = [
    {
      href: `/${locale}/settings`,
      label: t("settings"),
      icon: (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.5h-.5m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Overlay موبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 z-40 w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ltr:left-0 rtl:right-0 ${
          isOpen
            ? "translate-x-0"
            : locale === "ar"
            ? "translate-x-full sm:translate-x-0"
            : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-e border-gray-200">

          {/* Main nav */}
          <ul className="space-y-1 flex-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-main to-secondary text-white shadow-sm shadow-main/20"
                      : "text-gray-600 hover:bg-gray-100 hover:text-main"
                  }`}
                >
                  <span className={isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-main"}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-3 border-t border-gray-200" />

          {/* Bottom nav */}
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-main to-secondary text-white shadow-sm shadow-main/20"
                      : "text-gray-600 hover:bg-gray-100 hover:text-main"
                  }`}
                >
                  <span className={isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-main"}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}

            {/* Profile */}
            <li>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                  م
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-700 truncate">محمد</span>
                  <span className="text-xs text-gray-400 truncate">mohammed@email.com</span>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;