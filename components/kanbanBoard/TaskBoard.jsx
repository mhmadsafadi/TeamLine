"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { initialData } from "@/lib/data.js";

const TaskBoard = () => {
  const [data, setData] = useState(initialData);
  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function findColumnId(id) {
    if (id in data.columns) return id;
    return data.columnOrder.find((colId) =>
      data.columns[colId].taskIds.includes(id),
    );
  }

  function handleDragStart(event) {
    setActiveTask(data.tasks[event.active.id]);
  }
  // ينقل البطاقة بين الأعمدة لحظة السحب فوقها
  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(overId);

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId)
      return;

    setData((prev) => {
      const activeIds = [...prev.columns[activeColumnId].taskIds];
      const overIds = [...prev.columns[overColumnId].taskIds];

      const activeIndex = activeIds.indexOf(activeId);
      activeIds.splice(activeIndex, 1);

      let overIndex = overIds.indexOf(overId);
      if (overIndex === -1) overIndex = overIds.length;

      overIds.splice(overIndex, 0, activeId);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [activeColumnId]: {
            ...prev.columns[activeColumnId],
            taskIds: activeIds,
          },
          [overColumnId]: { ...prev.columns[overColumnId], taskIds: overIds },
        },
      };
    });
  }

  // يثبت الترتيب النهائي داخل نفس العمود
  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const columnId = findColumnId(activeId);
    const overColumnId = findColumnId(overId);
    if (!columnId || columnId !== overColumnId) return;

    const taskIds = data.columns[columnId].taskIds;
    const activeIndex = taskIds.indexOf(activeId);
    const overIndex = taskIds.indexOf(overId);

    if (activeIndex !== overIndex && overIndex !== -1) {
      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: arrayMove(taskIds, activeIndex, overIndex),
          },
        },
      }));
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="container flex gap-4 overflow-x-auto pb-4 px-4 md:px-8">
        {data.columnOrder.map((colId) => {
          const column = data.columns[colId];
          const tasks = column.taskIds.map((id) => data.tasks[id]);
          return <Column key={colId} column={column} tasks={tasks} />;
        })}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
