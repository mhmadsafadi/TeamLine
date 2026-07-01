"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

const PasswordTab = () => {
  const t = useTranslations("Dashboard.Settings.password");
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setError("");
    if (newPass !== confirm) {
      setError(t("mismatch"));
      return;
    }
    if (newPass.length < 8) {
      setError(t("tooShort"));
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password: newPass });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setSuccess(true);
    setCurrent(""); setNewPass(""); setConfirm("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">{t("current")}</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="••••••••"
          className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5">{t("new")}</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="••••••••"
          className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">{t("confirm")}</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          className="w-full block py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
        />
      </div>

      {error && <p className="text-sm text-red-500 mb-3">❌ {error}</p>}
      {success && (
        <p className="text-sm text-green-600 mb-3 flex items-center gap-1">
          <i className="ti ti-circle-check" aria-hidden="true" />
          {t("savedSuccess")}
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-5 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "..." : t("update")}
        </button>
      </div>
    </div>
  );
};

export default PasswordTab;