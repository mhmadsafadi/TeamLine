import { createClient } from "@/lib/supabase/server";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

const priorityColors = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

const MyTasks = async () => {
  const t = await getTranslations("Dashboard.myTasks");
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
    .limit(1);

  if (!workspace) return null;

  const { data: tasks } = await supabase
    .from("tasks")
    .select(`id, title, priority, due_date, columns(name), projects(id, name)`)
    .eq("assigned_to", user.id)
    .order("due_date", { ascending: true })
    .limit(5);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">{t("title")}</h2>
        <Link
          href={`/${locale}/tasks`}
          className="text-sm text-main hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      {!tasks || tasks.length === 0 ? (
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
              d="M8.5 11.5 11 14l4-4m-9.5 8H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
            />
          </svg>
          <p className="text-sm text-gray-400">{t("empty")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-main shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {task.projects?.name} • {task.columns?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {task.priority && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
                  >
                    {t(`priority.${task.priority}`)}
                  </span>
                )}
                {task.due_date && (
                  <span className="text-xs text-gray-400">
                    {new Date(task.due_date).toLocaleDateString(
                      locale === "ar" ? "ar-EG" : "en-US",
                      { month: "short", day: "numeric" },
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;
