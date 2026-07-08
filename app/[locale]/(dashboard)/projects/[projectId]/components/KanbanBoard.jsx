"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import AddColumnModal from "./AddColumnModal";

const KanbanBoard = ({ initialColumns, projectId }) => {
  const t = useTranslations("Dashboard.Projects.Project");
  const [columns, setColumns] = useState(initialColumns);
  const [activeTask, setActiveTask] = useState(null);
  const [showAddColumn, setShowAddColumn] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const findColumnOfTask = (taskId) =>
    columns.find((col) => col.tasks.some((t) => t.id === taskId));

  const handleDragStart = ({ active }) => {
    const col = findColumnOfTask(active.id);
    const task = col?.tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async ({ active, over }) => {
    setActiveTask(null);
    if (!over) return;

    const activeCol = findColumnOfTask(active.id);
    const overCol =
      findColumnOfTask(over.id) || columns.find((col) => col.id === over.id);

    if (!activeCol || !overCol) return;

    const supabase = createClient();

    if (activeCol.id === overCol.id) {
      // نفس العمود — إعادة ترتيب
      const oldIndex = activeCol.tasks.findIndex((t) => t.id === active.id);
      const newIndex = activeCol.tasks.findIndex((t) => t.id === over.id);
      if (oldIndex === newIndex) return;

      const newTasks = arrayMove(activeCol.tasks, oldIndex, newIndex);
      setColumns((prev) =>
        prev.map((col) =>
          col.id === activeCol.id ? { ...col, tasks: newTasks } : col,
        ),
      );

      // حدّث الـ position في قاعدة البيانات
      await Promise.all(
        newTasks.map((task, i) =>
          supabase.from("tasks").update({ position: i }).eq("id", task.id),
        ),
      );
    } else {
      // عمود مختلف
      const task = activeCol.tasks.find((t) => t.id === active.id);
      const newActiveColTasks = activeCol.tasks.filter(
        (t) => t.id !== active.id,
      );
      const newOverColTasks = [...overCol.tasks, task];

      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === activeCol.id)
            return { ...col, tasks: newActiveColTasks };
          if (col.id === overCol.id) return { ...col, tasks: newOverColTasks };
          return col;
        }),
      );

      await supabase
        .from("tasks")
        .update({
          column_id: overCol.id,
          position: newOverColTasks.length - 1,
        })
        .eq("id", active.id);
    }
  };

  const handleTaskAdded = (columnId, newTask) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col,
      ),
    );
  };

  const handleColumnAdded = (newColumn) => {
    setColumns((prev) => [...prev, { ...newColumn, tasks: [] }]);
    setShowAddColumn(false);
  };

  return (
    <div className="flex-1 overflow-x-auto pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 min-w-max">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              projectId={projectId}
              onTaskAdded={handleTaskAdded}
            />
          ))}

          {/* زر إضافة عمود */}
          <div className="w-72 shrink-0">
            <button
              onClick={() => setShowAddColumn(true)}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-600 hover:border-main hover:text-main transition cursor-pointer"
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
              {t("addColumn")}
            </button>
          </div>
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} isDragging />}
        </DragOverlay>
      </DndContext>

      {showAddColumn && (
        <AddColumnModal
          projectId={projectId}
          position={columns.length}
          onClose={() => setShowAddColumn(false)}
          onAdded={handleColumnAdded}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
