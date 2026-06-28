export default function MainLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      <div className="flex-col gap-4 flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-main text-4xl animate-spin flex items-center justify-center border-t-main rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-secondary text-2xl animate-spin flex items-center justify-center border-t-secondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}