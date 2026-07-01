"use client";

import { useTranslations } from "next-intl";

const icons = {
  profile: (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12Zm0 2.4c-4.8 0-7.2 2.4-7.2 4.8v1.2h14.4v-1.2c0-2.4-2.4-4.8-7.2-4.8Z"/>
    </svg>
  ),
  password: (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v3m-3-6V8a3 3 0 0 1 6 0v3M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
    </svg>
  ),
  logout: (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H4m8-4 4 4-4 4m4-4H4m12-8h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2"/>
    </svg>
  ),
};

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  const t = useTranslations("Dashboard.Settings");

  const tabs = [
    { id: "profile", label: t("tabs.profile") },
    { id: "password", label: t("tabs.password") },
    { id: "logout", label: t("tabs.logout") },
  ];

  return (
    <div className="flex sm:flex-col flex-row gap-1 sm:w-52 w-full overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer w-full ${
            activeTab === tab.id
              ? "bg-white text-main font-medium"
              : "text-gray-600 hover:bg-white/80"
          }`}
        >
          {icons[tab.id]}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;