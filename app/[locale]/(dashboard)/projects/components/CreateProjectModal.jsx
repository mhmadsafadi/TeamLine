"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";

const CreateProjectModal = ({ workspaceId, onClose, onCreated }) => {
  const t = useTranslations("Dashboard.Projects.modal");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    console.log("المساحة المرسلة للمودال هي:", workspaceId);
    if (!name.trim()) { setError(t("nameRequired")); return; }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error: createError } = await supabase
      .from("projects")
      .insert({
        name: name.trim(),
        description: description.trim(),
        workspace_id: workspaceId,
        created_by: user.id,
        status: "active",
      })
      .select()
      .single();

    if (createError) { setError(createError.message); setLoading(false); return; }

    // أنشئ الأعمدة الافتراضية
    await supabase.from("columns").insert([
      { project_id: data.id, name: locale === "ar" ? "قيد الانتظار" : "To Do", position: 1 },
      { project_id: data.id, name: locale === "ar" ? "قيد التنفيذ" : "In Progress", position: 2 },
      { project_id: data.id, name: locale === "ar" ? "مكتمل" : "Done", position: 3 },
    ]);

    onCreated(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">{t("title")}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">{t("name")} *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">{t("description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              rows={3}
              className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">❌ {error}</p>}

          <div className="flex justify-end gap-2.5 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              {t("cancel")}
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="px-5 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "..." : t("create")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;