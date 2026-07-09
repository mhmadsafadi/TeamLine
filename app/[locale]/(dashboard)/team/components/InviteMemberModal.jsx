"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

const InviteMemberModal = ({ workspaceId, onClose, onInvited }) => {
  const t = useTranslations("Dashboard.Team.modal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInvite = async () => {
    if (!email.trim()) {
      setError(t("emailRequired"));
      return;
    }
    setLoading(true);
    setError("");

    const supabase = createClient();

    // ابحث عن المستخدم بالإيميل
    const { data: users, error: searchError } = await supabase
      .from("users")
      .select("id, email, raw_user_meta_data")
      .eq("email", email.trim())
      .limit(1);

    if (searchError || !users?.length) {
      setError(t("userNotFound"));
      setLoading(false);
      return;
    }

    const invitedUser = users[0];

    // تحقق إذا عضو مسبقاً
    const { data: existing } = await supabase
      .from("workspace_members")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("user_id", invitedUser.id)
      .maybeSingle();

    if (existing) {
      setError(t("alreadyMember"));
      setLoading(false);
      return;
    }

    // أضف العضو
    const { data: newMember, error: insertError } = await supabase
      .from("workspace_members")
      .insert({
        workspace_id: workspaceId,
        user_id: invitedUser.id,
        role: "member",
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    onInvited({
      ...newMember,
      email: invitedUser.email,
      full_name:
        invitedUser.raw_user_meta_data?.full_name ||
        invitedUser.email?.split("@")[0],
      avatar_url: invitedUser.raw_user_meta_data?.avatar_url || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-red-500">❌ {error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleInvite}
              disabled={loading}
              className="px-4 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "..." : t("invite")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberModal;
