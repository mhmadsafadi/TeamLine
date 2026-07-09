import { createClient } from "@/lib/supabase/server";
import { getTranslations, getLocale } from "next-intl/server";
import TasksList from "./components/TasksList";

const TasksPage = async () => {
  const supabase = await createClient();
  const t = await getTranslations("Dashboard.Tasks");
  const locale = await getLocale();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: tasks } = await supabase
    .from("tasks")
    .select(
      `
      id, title, priority, due_date, created_at,
      columns(id, name, type),
      projects(id, name)
    `,
    )
    .eq("assigned_to", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">{t("title")}</h1>
      </div>
      <TasksList tasks={tasks || []} />
    </div>
  );
};

export default TasksPage;
