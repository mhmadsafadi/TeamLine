"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

import SettingsTabs from "./components/SettingsTabs";
import ProfileTab from "./components/ProfileTab";
import PasswordTab from "./components/PasswordTab";
import LogoutTab from "./components/LogoutTab";

const page = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const t = useTranslations("Dashboard.Settings");

    return (
      <div className="container py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">{t("title")}</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 bg-white/80 border border-gray-200 rounded-xl p-6 min-w-0">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "password" && <PasswordTab />}
          {activeTab === "logout" && <LogoutTab />}
        </div>
      </div>
    </div>
  )
}

export default page
