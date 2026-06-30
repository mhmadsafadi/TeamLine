import UseCaseVisual from "./UseCaseVisual";

const UseCaseCard = ({ item, title, description }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/70 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.className}`}
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-950">{title}</h3>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">
            {description}
          </p>
        </div>

        <span className={`h-3 w-3 shrink-0 rounded-full ${item.accent}`} />
      </div>

      <UseCaseVisual type={item.visual} accent={item.accent} />
    </div>
  );
};

export default UseCaseCard;
