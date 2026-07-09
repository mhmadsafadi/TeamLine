import { createClient } from "@/lib/supabase/server";
import ProjectsList from "./components/ProjectsList";

const ProjectsPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("id")
    .eq("owner_id", user.id)
    .limit(1);

  const workspace = workspaces?.[0];
  if (!workspace) return null;

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      id, name, description, due_date,
      columns(
        id, type,
        tasks(count)
      )
    `,
    )
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false });

  // احسب الإحصائيات لكل مشروع
  const projectsWithStats = (projects || []).map((project) => {
    const totalTasks =
      project.columns?.reduce(
        (sum, col) => sum + (col.tasks?.[0]?.count || 0),
        0,
      ) || 0;

    const completedTasks =
      project.columns
        ?.filter((col) => col.type === "done")
        ?.reduce((sum, col) => sum + (col.tasks?.[0]?.count || 0), 0) || 0;

    const inProgressTasks =
      project.columns
        ?.filter((col) => col.type === "in_progress")
        ?.reduce((sum, col) => sum + (col.tasks?.[0]?.count || 0), 0) || 0;

    const status =
      totalTasks > 0 && completedTasks === totalTasks
        ? "completed"
        : inProgressTasks > 0
          ? "active"
          : "active";

    return {
      ...project,
      totalTasks,
      completedTasks,
      status,
    };
  });

  return (
    <div>
      <ProjectsList projects={projectsWithStats} workspaceId={workspace.id} />
    </div>
  );
};

export default ProjectsPage;
