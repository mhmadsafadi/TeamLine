"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const WorkspacesPage = () => {
  const t = useTranslations("Workspace");
  const locale = useLocale();
  const router = useRouter();
  const { user, fetchWorkspace } = useAuthStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError(t("nameRequired"));
      return;
    }

    setLoading(true);
    setError("");
    const supabase = createClient();

    const { data: workspace, error: createError } = await supabase
      .from("workspaces")
      .insert({
        name: name.trim(),
        description: description.trim(),
        owner_id: user.id,
      })
      .select()
      .single();

    if (createError) {
      setError(t("createError"));
      setLoading(false);
      return;
    }

    // أضف المستخدم كـ owner في workspace_members
    await supabase.from("workspace_members").insert({
      workspace_id: workspace.id,
      user_id: user.id,
      role: "owner",
    });

    await fetchWorkspace();
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            T
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {t("createTitle")}
          </h1>
          <p className="text-sm text-gray-400">{t("createDescription")}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("name")} *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1.5">
              {t("description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              rows={3}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">❌ {error}</p>}

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full py-2.5 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer font-medium"
          >
            {loading ? "..." : t("createBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspacesPage;
