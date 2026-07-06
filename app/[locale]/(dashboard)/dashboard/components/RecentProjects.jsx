import { createClient } from "@/lib/supabase/server";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

const RecentProjects = async () => {
  const t = await getTranslations("Dashboard.recentProjects");
  const locale = await getLocale();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!workspace) return null;

  const { data: projects } = await supabase
    .from("projects")
    .select(`id, name, description, created_at, tasks(count)`)
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">{t("title")}</h2>
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-main hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
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
              d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
            />
          </svg>
          <p className="text-sm text-gray-400">{t("empty")}</p>
          <Link
            href={`/${locale}/projects`}
            className="mt-2 text-sm text-main hover:underline"
          >
            {t("create")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.id}`}
              className="p-4 rounded-xl border border-gray-100 hover:border-main/30 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEEDFE] flex items-center justify-center text-main font-bold text-sm shrink-0">
                  {project.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-gray-700 truncate group-hover:text-main transition">
                  {project.name}
                </p>
              </div>
              {project.description && (
                <p className="text-xs text-gray-400 truncate mb-2">
                  {project.description}
                </p>
              )}
              <p className="text-xs text-gray-400">
                {project.tasks?.[0]?.count || 0} {t("tasks")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
