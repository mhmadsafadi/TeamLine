const SectionHeader = ({
  label,
  title,
  description,
  align = "center",
  labelClassName = "text-main",
  titleClassName = "text-black",
  descriptionClassName = "text-gray-600",
}) => {

  const textAlign = align === "start" ? "text-start" : "text-center";
  const marginAlign = align === "start" ? "" : "mx-auto";

  return (
    <div className={`mb-8 mx-auto max-w-3xl ${textAlign}`}>
      {label && (
        <h1 className={`text-xl font-semibold ${labelClassName}`}>{label}</h1>
      )}
      
      <h2 className={`${marginAlign} my-4 md:leading-14 text-3xl font-bold text-gray-950 md:text-5xl ${titleClassName}`}>
        {title}
      </h2>

      {description && (
        <p className={`${marginAlign} max-w-2xl text-base leading-7 text-gray-200 md:text-lg md:leading-8 ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
