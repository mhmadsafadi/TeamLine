"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityConfig = {
  high: { label: "عالية", className: "bg-red-50 text-red-600" },
  medium: { label: "متوسطة", className: "bg-yellow-50 text-yellow-600" },
  low: { label: "منخفضة", className: "bg-green-50 text-green-600" },
};

const TaskCard = ({ task, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white border border-gray-200 rounded-lg p-3 cursor-grab active:cursor-grabbing select-none hover:border-main/30 hover:shadow-sm transition-all ${
        isDragging ? "shadow-lg rotate-1 border-main" : ""
      }`}
    >
      {/* Priority badge */}
      {priority && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${priority.className}`}
        >
          {priority.label}
        </span>
      )}

      {/* Title */}
      <p className="text-sm font-medium text-gray-700 leading-snug mb-2">
        {task.title}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#534AB7] text-xs font-bold">
          م
        </div>
        {task.due_date && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M4 8v10a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1V8"
              />
            </svg>
            {new Date(task.due_date).toLocaleDateString("ar-EG", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
