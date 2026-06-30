const DesignVisual = ({ accent }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {["Wireframe", "UI Review", "Handoff"].map((text) => (
        <div key={text} className="rounded-2xl bg-white/75 p-4 shadow-sm">
          <div className={`mb-4 h-2 w-14 rounded-full ${accent}`} />
          <div className="h-2 rounded-full bg-gray-200" />
          <div className="mt-2 h-2 w-2/3 rounded-full bg-gray-200" />
          <p className="mt-4 text-xs font-semibold text-gray-500">{text}</p>
        </div>
      ))}
    </div>
  );
};

const SoftwareVisual = () => {
  return (
    <div className="rounded-2xl bg-gray-950 p-4 text-xs text-white shadow-sm">
      <div className="mb-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-red-400" />
        <span className="size-2 rounded-full bg-yellow-400" />
        <span className="size-2 rounded-full bg-emerald-400" />
      </div>
      <p className="text-main">const sprint = &#123;</p>
      <p className="ms-4 text-white/80">features: 8,</p>
      <p className="ms-4 text-white/80">reviews: 3,</p>
      <p className="ms-4 text-white/80">status: "on track"</p>
      <p className="text-main">&#125;</p>
    </div>
  );
};

const MarketingVisual = ({ accent }) => {
  return (
    <div className="space-y-3">
      {["Content", "Approval", "Launch"].map((text, index) => (
        <div
          key={text}
          className="flex items-center gap-3 rounded-2xl bg-white/75 p-3 shadow-sm"
        >
          <span
            className={`grid size-8 place-items-center rounded-full ${accent} text-xs font-bold text-white`}
          >
            {index + 1}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{text}</p>
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${accent}`}
                style={{ width: `${45 + index * 20}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentsVisual = ({ accent }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Research notes", "Task split", "Final review", "Submit"].map(
        (text, index) => (
          <div
            key={text}
            className="flex items-center gap-3 rounded-2xl bg-white/75 p-4 shadow-sm"
          >
            <span
              className={`size-4 rounded ${
                index < 3 ? accent : "bg-gray-200"
              }`}
            />
            <p className="text-sm font-semibold text-gray-700">{text}</p>
          </div>
        ),
      )}
    </div>
  );
};

const UseCaseVisual = ({ type, accent }) => {
  if (type === "design") return <DesignVisual accent={accent} />;
  if (type === "software") return <SoftwareVisual />;
  if (type === "marketing") return <MarketingVisual accent={accent} />;

  return <StudentsVisual accent={accent} />;
};

export default UseCaseVisual;
