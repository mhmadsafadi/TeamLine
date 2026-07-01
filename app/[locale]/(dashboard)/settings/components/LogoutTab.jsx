"use client";

import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const LogoutTab = () => {
  const t = useTranslations("Dashboard.Settings.logout");
  const locale = useLocale();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace(`/${locale}/login`);
  };
  

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <svg className="w-12 h-12 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12H4m8-4 4 4-4 4m4-4H4m12-8h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2"/>
      </svg>  
      <p className="text-base font-medium text-gray-800 mb-2">{t("title")}</p>
      <p className="text-sm text-gray-400 mb-6">{t("description")}</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
      >
        {t("btn")}
      </button>
    </div>
  );
};

export default LogoutTab;