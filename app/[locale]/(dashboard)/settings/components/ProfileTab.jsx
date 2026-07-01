"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";

const CameraIcon = () => (
  <svg className="w-3 h-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1V8a2 2 0 0 0-2-2h-.5L15 4H9L7.5 6H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1-7 5-5-1.5-1.5L11 12l-1.5-1.5L8 12l3 3Z"/>
  </svg>
);

const ProfileTab = () => {
  const t = useTranslations("Dashboard.Settings.profile");
  const { user, fetchUser } = useAuthStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const fullName = `${firstName} ${lastName}`.trim() || "U";
  const initials = fullName.charAt(0).toUpperCase();

  const handleSave = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    });
    await fetchUser();
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDiscard = () => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
    }
  };

  return (
    <div>
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#534AB7] text-2xl font-medium">
            {initials}
          </div>
          <div className="absolute bottom-0 end-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
            <CameraIcon />
          </div>
        </div>
        <div>
          <p className="text-base font-medium text-gray-800">{fullName}</p>
          <p className="text-sm text-gray-400 mt-0.5">{email}</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">{t("firstName")}</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">{t("lastName")}</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">{t("email")}</label>
        <div className="relative">
          <input
            value={email}
            disabled
            className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
          />
          <span className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-green-600">
            <CheckIcon />
            {t("verified")}
          </span>
        </div>
      </div>

      {/* Success message */}
      {success && (
        <p className="text-sm text-green-600 mb-3 flex items-center gap-1">
          <CheckIcon />
          {t("savedSuccess")}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2.5">
        <button
          onClick={handleDiscard}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          {t("discard")}
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "..." : t("save")}
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;