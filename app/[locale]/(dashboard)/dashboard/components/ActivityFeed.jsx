"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

const ActivityFeed = () => {
  const t = useTranslations("Dashboard.activity");
  const locale = useLocale();
  const { workspace } = useAuthStore();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspace) return;

    const fetchActivities = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("tasks")
        .select(
          `
          id, title, created_at,
          projects(name),
          columns(name)
        `,
        )
        .eq("projects.workspace_id", workspace.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setActivities(data || []);
      setLoading(false);
    };

    fetchActivities();
  }, [workspace]);

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (locale === "ar") {
      if (mins < 60) return `منذ ${mins} دقيقة`;
      if (hours < 24) return `منذ ${hours} ساعة`;
      return `منذ ${days} يوم`;
    } else {
      if (mins < 60) return `${mins}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col h-full">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        {t("title")}
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <svg
            className="w-10 h-10 text-gray-300 mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-sm text-gray-400">{t("empty")}</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto flex-1">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EEEDFE] flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-main"
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
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{t("taskAdded")}</span>{" "}
                  <span className="text-main">{activity.title}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {activity.projects?.name} • {timeAgo(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
