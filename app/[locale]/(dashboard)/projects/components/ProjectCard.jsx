import Link from "next/link";

const ProjectCard = () => {
  return (
    <div className="flex flex-col justify-center bg-white rounded-2xl p-5 shadow-lg w-full">
      
      {/* 1. رأس البطاقة: الاسم والحالة */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <Link href={"projects/id"}>
            <h3 className="text-lg font-bold text-gray-800 hover:text-main transition">
                منصة TeamLine / TeamLine Platform
            </h3>
        </Link>
        <span className="text-xs px-2.5 py-1 rounded-full border whitespace-nowrap text-amber-400 bg-amber-500/10 border-amber-500/20">
          قيد التنفيذ / In Progress
        </span>
      </div>

      {/* 2. الوصف */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-5 leading-relaxed">
        تطوير منصة سحابية لإدارة المشاريع مخصصة للسوق العربي تدعم الواجهات بشكل كامل.
      </p>

      {/* 3. شريط التقدم الافتراضي */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>نسبة الإنجاز / Progress</span>
          <span>7/12</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-main h-full rounded-full w-[58%]"></div>
        </div>
      </div>

      {/* 4. أسفل البطاقة: صور الأعضاء وتاريخ التسليم */}
      <div className="flex justify-between items-center border-t border-gray-400 pt-4 mt-auto">
        
        {/* صور أعضاء الفريق الافتراضية - تدعم الاتجاه تلقائياً عبر الكلاس الذكي */}
        <div className="flex -space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-full border-1 border-[#161b22] overflow-hidden bg-main">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
              alt="Member 1" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-1 border-[#161b22] overflow-hidden bg-main">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" 
              alt="Member 2" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-1 border-main bg-gray-200 flex items-center justify-center text-sm text-gray-600 font-medium">
            +1
          </div>
        </div>

        {/* تاريخ التسليم - يغير محاذاته تلقائياً حسب لغة الصفحة */}
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            تاريخ التسليم / Due Date
          </span>
          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1 mt-0.5">
            📅 2026/08/15
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProjectCard;
