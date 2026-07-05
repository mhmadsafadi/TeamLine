"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const statusColors = {
  active: "text-amber-500 bg-amber-50 border-amber-200",
  completed: "text-green-600 bg-green-50 border-green-200",
  paused: "text-gray-500 bg-gray-100 border-gray-200",
};

const ProjectCard = ({ project }) => {
  const locale = useLocale();
  const t = useTranslations("Dashboard.Projects.card");

  const totalTasks = project?.totalTasks || 0;
  const completedTasks = project?.completedTasks || 0;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const members = project?.members || [];
  const visibleMembers = members.slice(0, 3);
  const extraMembers = members.length - 3;

  return (
    <div className="flex flex-col bg-white rounded-2xl p-5 border border-gray-200 hover:border-main/30 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <Link href={`/${locale}/projects/${project?.id}`}>
          <h3 className="text-base font-semibold text-gray-800 hover:text-main transition line-clamp-1">
            {project?.name || t("untitled")}
          </h3>
        </Link>
        <span
          className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap font-medium ${statusColors[project?.status] || statusColors.active}`}
        >
          {t(`status.${project?.status || "active"}`)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-5 leading-relaxed flex-1">
        {project?.description || t("noDescription")}
      </p>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{t("progress")}</span>
          <span>
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-main to-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        {/* Members */}
        <div className="flex -space-x-2 rtl:space-x-reverse">
          {visibleMembers.map((member, i) =>
            member.avatar_url ? (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={member.avatar_url}
                  alt={member.name || "member"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-xs font-bold"
              >
                {(member.name || "U").charAt(0).toUpperCase()}
              </div>
            ),
          )}
          {extraMembers > 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
              +{extraMembers}
            </div>
          )}
          {members.length === 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-400"
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
            </div>
          )}
        </div>

        {/* Due Date */}
        {project?.due_date && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">{t("dueDate")}</span>
            <span className="text-xs font-medium text-gray-600 mt-0.5">
              {new Date(project.due_date).toLocaleDateString(
                locale === "ar" ? "ar-EG" : "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
