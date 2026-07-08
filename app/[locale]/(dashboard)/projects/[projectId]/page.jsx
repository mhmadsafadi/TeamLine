import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import KanbanBoard from "./components/KanbanBoard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";

const page = async ({ params }) => {
  const { projectId } = await params;
  const supabase = await createClient();
  const t = await getTranslations("Dashboard.Projects.Project");
  const locale = await getLocale();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return notFound();

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, description, status")
    .eq("id", projectId)
    .single();

  if (!project) return notFound();

  const { data: columns } = await supabase
    .from("columns")
    .select(
      `
      id, name, position, color,
      tasks(
        id, title, description, priority, due_date, position,
        assigned_to
      )
    `,
    )
    .eq("project_id", projectId)
    .order("position", { ascending: true });

  // ترتيب المهام داخل كل عمود
  const columnsWithSortedTasks = (columns || []).map((col) => ({
    ...col,
    tasks: (col.tasks || []).sort((a, b) => a.position - b.position),
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="flex items-center text-sm gap-2 text-gray-400 mb-3">
            <Link
              href={`/${locale}/projects`}
              className="hover:text-main transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"></path></svg>
              {t("projects")}
            </Link>
            <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
            <span className="text-gray-500 font-semibold">{project.name}</span>
          </nav>  
          <h1 className="text-xl font-semibold text-gray-800">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-sm text-gray-400 mt-0.5">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        initialColumns={columnsWithSortedTasks}
        projectId={projectId}
      />
    </div>
  );
};

export default page;
