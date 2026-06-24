"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const columnStyles = {
  todo: { dot: "bg-slate-400", border: "border-t-slate-400" },
  "in-progress": { dot: "bg-blue-500", border: "border-t-blue-500" },
  review: { dot: "bg-amber-500", border: "border-t-amber-500" },
  done: { dot: "bg-emerald-500", border: "border-t-emerald-500" },
};

const Column = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const style = columnStyles[column.id] ?? columnStyles.todo;

  return (
    <div className="flex flex-col w-full min-w-[260px] bg-slate-50 rounded-2xl border border-slate-200">
      {/* رأس العمود */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-t-2 rounded-t-2xl ${style.border}`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
          <h3 className="font-bold text-slate-700 text-sm">{column.title}</h3>
        </div>
        <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
          {tasks.length}
        </span>
      </div>

      {/* البطاقات */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="flex flex-col gap-3 p-3 min-h-[140px] flex-1"
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
