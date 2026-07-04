import ActivityFeed from "./components/ActivityFeed";
import MyTasks from "./components/MyTasks";
import RecentProjects from "./components/RecentProjects";
import StatsCards from "./components/StatsCards";

const page = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <StatsCards />
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MyTasks />
          <RecentProjects />
        </div>
        <div className="flex flex-col">
          <ActivityFeed />
        </div>
      </section>
    </div>
  );
};

export default page;
