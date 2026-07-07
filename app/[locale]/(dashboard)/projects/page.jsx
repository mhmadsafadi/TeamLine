import { createClient } from "@/lib/supabase/server";
import ProjectsList from "./components/ProjectsList";

const ProjectsPage = async () => {
  const supabase = await createClient();

  // 1. جلب بيانات المستخدم الحالي
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. جلب مساحة العمل الحالية للمستخدم بأمان
  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  // إذا حدث خطأ أو لا يوجد مساحة عمل، نعرض قائمة فارغة أو نوقف التنفيذ بأمان
  if (workspaceError || !workspace) {
    return (
      <div>
        <ProjectsList projects={[]} workspaceId={null} />
      </div>
    );
  }

  // 3. جلب المشاريع التابعة لمساحة العمل هذه (بدون عمل Join خاطئ)
  const { data: rawProjects, error: projectsError } = await supabase
    .from("projects")
    .select(
      `
      id, name, description, created_at, status, due_date,
      tasks(count)
    `,
    ) // 👈 قمنا بحذف workspace_members من هنا تماماً
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error("Server Error fetching projects:", projectsError.message);
  }

  // 4. تحوير البيانات لتتطابق مع ما يتوقعه المكون ProjectCard بأمان
  const projects =
    rawProjects?.map((project) => ({
      ...project,
      totalTasks: project.tasks?.[0]?.count || 0,
      completedTasks: 0,
      members: [], // 👈 نمرر مصفوفة فارغة الآن لتجنب أي خطأ في كرت المشروع
    })) || [];

  return (
    <div>
      <ProjectsList projects={projects} workspaceId={workspace.id} />
    </div>
  );
};

export default ProjectsPage;
