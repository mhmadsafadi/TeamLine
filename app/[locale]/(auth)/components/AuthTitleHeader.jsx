import { useTranslations } from "next-intl";

const AuthTitleHeader = ({ namespace }) => {
    const t = useTranslations(namespace);

  return (
    <div className="mb-10">
      <h1 className="text-2xl md:text-3xl mb-2 font-semibold bg-gradient-to-tr from-main to-secondary bg-clip-text text-transparent">
        {t("title")}
      </h1>
      <p className="text-gray-500">{t("description")}</p>
    </div>
  )
}

export default AuthTitleHeader