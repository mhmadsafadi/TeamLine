"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

const AddTaskModal = ({ columnId, projectId, position, onClose, onAdded }) => {
  const t = useTranslations("Dashboard.Projects.Project.taskModal");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      setError(t("titleRequired"));
      return;
    }
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error: err } = await supabase
      .from("tasks")
      .insert({
        title: title.trim(),
        column_id: columnId,
        project_id: projectId,
        priority,
        due_date: dueDate || null,
        position,
        created_by: user.id,
      })
      .select()
      .single();

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    onAdded(data);
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
            <label className="block text-sm text-gray-500 mb-1">
              {t("taskTitle")} *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("taskTitlePlaceholder")}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              {t("priority")}
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
            >
              <option value="low">{t("low")}</option>
              <option value="medium">{t("medium")}</option>
              <option value="high">{t("high")}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              {t("dueDate")}
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
            />
          </div>

          {error && <p className="text-xs text-red-500">❌ {error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-4 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "..." : t("add")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
