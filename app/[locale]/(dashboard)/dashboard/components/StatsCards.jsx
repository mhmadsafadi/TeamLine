"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

const StatCard = ({ label, value, icon, loading }) => (
  <div className="h-28 p-5 bg-white border border-gray-200 rounded-2xl flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-[#EEEDFE] flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      {loading ? (
        <div className="w-16 h-6 bg-gray-200 animate-pulse rounded mb-1" />
      ) : (
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      )}
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

const StatsCards = () => {
  const t = useTranslations("Dashboard.stats");
  const { workspace } = useAuthStore();
  const [stats, setStats] = useState({
    projects: 0,
    completed: 0,
    inProgress: 0,
    members: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspace) return;

    const fetchStats = async () => {
      const supabase = createClient();

      const [
        { count: projects },
        { count: completed },
        { count: inProgress },
        { count: members },
      ] = await Promise.all([
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("workspace_id", workspace.id),
        supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("project_id", workspace.id),
        supabase.from("tasks").select("*", { count: "exact", head: true }),
        supabase
          .from("workspace_members")
          .select("*", { count: "exact", head: true })
          .eq("workspace_id", workspace.id),
      ]);

      setStats({
        projects: projects || 0,
        completed: completed || 0,
        inProgress: inProgress || 0,
        members: members || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, [workspace]);

  const cards = [
    {
      label: t("projects"),
      value: stats.projects,
      icon: (
        <svg
          className="w-6 h-6 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
          />
        </svg>
      ),
    },
    {
      label: t("completed"),
      value: stats.completed,
      icon: (
        <svg
          className="w-6 h-6 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.5 11.5 11 14l4-4m-9.5 8H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
          />
        </svg>
      ),
    },
    {
      label: t("inProgress"),
      value: stats.inProgress,
      icon: (
        <svg
          className="w-6 h-6 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      label: t("members"),
      value: stats.members,
      icon: (
        <svg
          className="w-6 h-6 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} loading={loading} />
      ))}
    </section>
  );
};

export default StatsCards;
