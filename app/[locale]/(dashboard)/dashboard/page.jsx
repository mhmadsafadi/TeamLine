import { Suspense } from "react";
import StatsCards from "./components/StatsCards";
import MyTasks from "./components/MyTasks";
import RecentProjects from "./components/RecentProjects";
import ActivityFeed from "./components/ActivityFeed";

const EmptyCard = ({ className }) => (
  <div
    className={`bg-white border border-gray-200 rounded-2xl flex items-center justify-center ${className}`}
  >
    <p className="text-sm text-gray-300">—</p>
  </div>
);

const page = async () => {
  return (
    <div className="flex flex-col gap-5 p-0 md:p-3 w-full">
      <Suspense
        fallback={
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <EmptyCard key={i} className="h-28" />
            ))}
          </section>
        }
      >
        <StatsCards />
      </Suspense>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Suspense fallback={<EmptyCard className="h-64" />}>
            <MyTasks />
          </Suspense>
          <Suspense fallback={<EmptyCard className="h-64" />}>
            <RecentProjects />
          </Suspense>
        </div>
        <Suspense fallback={<EmptyCard className="h-full min-h-64" />}>
          <ActivityFeed />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
