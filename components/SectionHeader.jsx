const SectionHeader = ({
  label,
  title,
  description,
  labelClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <div className="mb-8 mx-auto max-w-3xl text-center">
      <h1 className={`text-2xl font-semibold ${labelClassName}`}>{label}</h1>

      <h2 className={`my-4 text-3xl font-bold text-gray-950 md:text-5xl ${titleClassName}`}>
        {title}
      </h2>

      {description && (
        <p className={`mx-auto max-w-2xl text-base leading-7 text-gray-200 md:text-lg md:leading-8 ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
