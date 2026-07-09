"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const priorityConfig = {
  high: {
    label: "عالية",
    en: "High",
    className: "bg-red-50 text-red-600 border-red-200",
  },
  medium: {
    label: "متوسطة",
    en: "Medium",
    className: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  low: {
    label: "منخفضة",
    en: "Low",
    className: "bg-green-50 text-green-600 border-green-200",
  },
};

const statusConfig = {
  done: { label: "مكتمل", en: "Done", className: "bg-green-50 text-green-600" },
  in_progress: {
    label: "قيد التنفيذ",
    en: "In Progress",
    className: "bg-blue-50 text-blue-600",
  },
  todo: {
    label: "قيد الانتظار",
    en: "To Do",
    className: "bg-gray-100 text-gray-600",
  },
};

const filters = ["all", "todo", "in_progress", "done", "high"];

const TasksList = ({ tasks }) => {
  const t = useTranslations("Dashboard.Tasks");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "high") return task.priority === "high";
    return task.columns?.type === activeFilter;
  });

  const isOverdue = (date) =>
    date && new Date(date) < new Date() && task?.columns?.type !== "done";

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition cursor-pointer ${
              activeFilter === f
                ? "bg-main text-white border-main"
                : "bg-white text-gray-500 border-gray-200 hover:border-main hover:text-main"
            }`}
          >
            {t(`filter.${f}`)}
          </button>
        ))}
      </div>

      {/* Tasks */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg
            className="w-12 h-12 text-gray-300 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8.5 11.5 11 14l4-4m-9.5 8H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
            />
          </svg>
          <p className="text-gray-500 font-medium">{t("empty")}</p>
          <p className="text-sm text-gray-400 mt-1">{t("emptyDescription")}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {filtered.map((task, i) => {
            const priority = priorityConfig[task.priority];
            const status = statusConfig[task.columns?.type || "todo"];
            const overdue =
              task.due_date &&
              new Date(task.due_date) < new Date() &&
              task.columns?.type !== "done";

            return (
              <div
                key={task.id}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition ${
                  i !== filtered.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Status dot */}
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    task.columns?.type === "done"
                      ? "bg-green-500"
                      : task.columns?.type === "in_progress"
                        ? "bg-blue-400"
                        : "bg-gray-300"
                  }`}
                />

                {/* Title + project */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      task.columns?.type === "done"
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </p>
                  <Link
                    href={`/${locale}/projects/${task.projects?.id}`}
                    className="text-xs text-gray-400 hover:text-main transition"
                  >
                    {task.projects?.name} • {task.columns?.name}
                  </Link>
                </div>

                {/* Priority */}
                {priority && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 hidden sm:inline-flex ${priority.className}`}
                  >
                    {locale === "ar" ? priority.label : priority.en}
                  </span>
                )}

                {/* Status */}
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 hidden md:inline-flex ${status.className}`}
                >
                  {locale === "ar" ? status.label : status.en}
                </span>

                {/* Due date */}
                {task.due_date && (
                  <span
                    className={`text-xs shrink-0 flex items-center gap-1 ${
                      overdue ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M4 8v10a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1V8"
                      />
                    </svg>
                    {new Date(task.due_date).toLocaleDateString(
                      locale === "ar" ? "ar-EG" : "en-US",
                      { month: "short", day: "numeric" },
                    )}
                    {overdue && ` (${t("overdue")})`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TasksList;
