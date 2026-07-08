"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";

const columnColors = {
  default: "bg-gray-400",
  blue: "bg-blue-400",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  red: "bg-red-400",
  purple: "bg-purple-400",
};

const KanbanColumn = ({ column, projectId, onTaskAdded }) => {
  const t = useTranslations("Dashboard.Projects.Project");
  const [showAddTask, setShowAddTask] = useState(false);

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="w-72 shrink-0 flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-1 px-2 py-3 rounded-t-xl bg-main/10">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${columnColors[column.color] || columnColors.default}`}
          />
          <span className="text-sm font-semibold text-gray-600">
            {column.name}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="text-gray-600 hover:text-main transition cursor-pointer"
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
        </button>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className={`flex-1 flex flex-col gap-2 p-2 rounded-b-xl min-h-[200px] transition-colors ${
          isOver
            ? "bg-main/5 border-2 border-dashed border-main/30"
            : "bg-gray-50"
        }`}
      >
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-main border border-dashed border-gray-400 hover:border-main rounded-lg transition cursor-pointer mt-auto"
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
          {t("addTask")}
        </button>
      </div>

      {showAddTask && (
        <AddTaskModal
          columnId={column.id}
          projectId={projectId}
          position={column.tasks.length}
          onClose={() => setShowAddTask(false)}
          onAdded={(task) => {
            onTaskAdded(column.id, task);
            setShowAddTask(false);
          }}
        />
      )}
    </div>
  );
};

export default KanbanColumn;
