"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

const colors = [
  { value: "default", className: "bg-gray-400" },
  { value: "blue", className: "bg-blue-400" },
  { value: "green", className: "bg-green-500" },
  { value: "yellow", className: "bg-yellow-400" },
  { value: "red", className: "bg-red-400" },
  { value: "purple", className: "bg-purple-400" },
];

const AddColumnModal = ({ projectId, position, onClose, onAdded }) => {
  const t = useTranslations("Dashboard.Projects.Project.columnModal");
  const [name, setName] = useState("");
  const [color, setColor] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) {
      setError(t("nameRequired"));
      return;
    }
    setLoading(true);

    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("columns")
      .insert({ name: name.trim(), project_id: projectId, position, color })
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
              {t("name")} *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              {t("color")}
            </label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full ${c.className} transition ${
                    color === c.value ? "ring-2 ring-offset-2 ring-main" : ""
                  } cursor-pointer`}
                />
              ))}
            </div>
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

export default AddColumnModal;
