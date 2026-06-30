const ProjectFlowMockup = () => {
  const stages = [
    {
      title: "Idea",
      task: "Collect homepage goals",
      color: "bg-secondary",
      progress: "20%",
    },
    {
      title: "Plan",
      task: "Define project tasks",
      color: "bg-main",
      progress: "45%",
    },
    {
      title: "Build",
      task: "Design dashboard UI",
      color: "bg-sky-400",
      progress: "70%",
    },
    {
      title: "Done",
      task: "Launch workspace",
      color: "bg-emerald-400",
      progress: "100%",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-full bg-gradient-to-tr from-main/25 via-cyan-200/20 to-secondary/25 blur-[80px]" />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-main">TeamLine Flow</p>
            <h3 className="mt-1 text-xl font-bold text-gray-950">
              Website Redesign
            </h3>
          </div>

          <div className="flex -space-x-2 rtl:space-x-reverse">
            <span className="grid size-8 place-items-center rounded-full bg-main text-xs font-bold text-white ring-2 ring-white">
              S
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-bold text-white ring-2 ring-white">
              A
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-sky-400 text-xs font-bold text-white ring-2 ring-white">
              M
            </span>
          </div>
        </div>

        <div className="relative grid gap-4 md:grid-cols-4">
          <div className="absolute left-[10%] right-[10%] top-6 hidden h-1 rounded-full bg-main/20 md:block" />
          <div className="absolute left-[10%] top-6 hidden h-1 w-[62%] rounded-full bg-gradient-to-r from-secondary via-main to-sky-400 md:block" />

          {stages.map((stage) => (
            <div key={stage.title} className="relative">
              <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-white shadow-md ring-4 ring-white">
                <span className={`size-5 rounded-full ${stage.color}`} />
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-bold text-gray-950">{stage.title}</h4>
                  <span className="text-xs font-semibold text-main">
                    {stage.progress}
                  </span>
                </div>

                <p className="min-h-10 text-sm leading-6 text-gray-600">
                  {stage.task}
                </p>

                <div className="mt-4 h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${stage.color}`}
                    style={{ width: stage.progress }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-main/10 bg-main/5 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-950">
                Project progress
              </p>
              <p className="mt-1 text-xs text-gray-500">
                12 tasks completed from 18
              </p>
            </div>

            <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-main shadow-sm">
              72%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlowMockup;