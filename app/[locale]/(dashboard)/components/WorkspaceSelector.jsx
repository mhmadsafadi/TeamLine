"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";

const WorkspaceSelector = ({ locale }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Workspace");
  const { workspace, fetchWorkspace } = useAuthStore();

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const name = workspace?.name || t("defaultWorkspaceName");
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initial}
          </div>
          <span className="text-sm font-medium text-gray-700 truncate">
            {name}
          </span>
        </div>
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 w-full z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* اسم الـ workspace الحالي */}
            {workspace && (
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
                <div className="w-6 h-6 rounded-md bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initial}
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">
                  {name}
                </span>
                <svg
                  className="w-4 h-4 text-green-500 ms-auto shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m5 12 4.7 4.5 9.3-9"
                  />
                </svg>
              </div>
            )}

            {/* إنشاء workspace جديد */}
            <Link
              href={`/${locale}/workspaces`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t("manageWorkspaces")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkspaceSelector;
