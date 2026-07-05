import { createClient } from "@/lib/supabase/server";
import ProjectsList from "./components/ProjectsList";

const ProjectsPage = async () => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  const { data: projects } = workspace ? await supabase
    .from("projects")
    .select(`
      id, name, description, created_at, status, due_date,
      tasks(count),
      workspace_members(
        user_id
      )
    `)
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false }) : { data: [] };

  return (
    <div>
      <ProjectsList projects={projects || []} workspaceId={workspace?.id} />
    </div>
  );
};

export default ProjectsPage;