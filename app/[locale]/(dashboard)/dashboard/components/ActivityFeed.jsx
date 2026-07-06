import { createClient } from "@/lib/supabase/server";
import { getTranslations, getLocale } from "next-intl/server";

const ActivityFeed = async () => {
  const t = await getTranslations("Dashboard.activity");
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

  const { data: activities } = await supabase
    .from("tasks")
    .select(`id, title, created_at, projects(name)`)
    .eq("projects.workspace_id", workspace.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (locale === "ar") {
      if (mins < 60) return `منذ ${mins} دقيقة`;
      if (hours < 24) return `منذ ${hours} ساعة`;
      return `منذ ${days} يوم`;
    }
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col h-full">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        {t("title")}
      </h2>

      {!activities || activities.length === 0 ? (
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
                  <span className="text-main">"{activity.title}"</span>
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
