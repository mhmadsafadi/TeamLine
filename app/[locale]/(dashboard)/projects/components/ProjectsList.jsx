"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

const ProjectsList = ({ projects, workspaceId }) => {
  const t = useTranslations("Dashboard.Projects");
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState(projects);

  const handleProjectCreated = (newProject) => {
    setProjectList((prev) => [newProject, ...prev]);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">{t("title")}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition cursor-pointer"
        >
          <svg
            className="w-4 h-4"
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
          {t("create")}
        </button>
      </div>

      {projectList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg
            className="w-14 h-14 text-gray-300 mb-4"
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
          <p className="text-gray-500 font-medium mb-1">{t("empty")}</p>
          <p className="text-sm text-gray-400 mb-4">{t("emptyDescription")}</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-main text-white rounded-lg text-sm hover:bg-main/90 transition cursor-pointer"
          >
            {t("create")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          workspaceId={workspaceId}
          onClose={() => setShowModal(false)}
          onCreated={handleProjectCreated}
        />
      )}
    </>
  );
};

export default ProjectsList;
