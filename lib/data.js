export const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "تصميم واجهة لوحة التحكم" },
    "task-2": { id: "task-2", content: "كتابة توثيق API" },
    "task-3": { id: "task-3", content: "مراجعة طلبات السحب" },
    "task-4": { id: "task-4", content: "إعداد قاعدة البيانات" },
    "task-5": { id: "task-5", content: "اختبار تسجيل الدخول" },
    "task-6": { id: "task-6", content: "نشر النسخة التجريبية" },
  },
  columns: {
    todo: { id: "todo", title: "قائمة المهام", taskIds: ["task-1", "task-2"] },
    "in-progress": { id: "in-progress", title: "قيد التنفيذ", taskIds: ["task-3"] },
    review: { id: "review", title: "مراجعة", taskIds: ["task-4"] },
    done: { id: "done", title: "مكتمل", taskIds: ["task-5", "task-6"] },
  },
  columnOrder: ["todo", "in-progress", "review", "done"],
};