import { useTranslations } from "next-intl";
import AuthTitleHeader from "../components/AuthTitleHeader";
import Link from "next/link";

const LoginPage = () => {
    const t = useTranslations("Auth");

  return (
    <div className='max-w-md mx-auto'>
      <AuthTitleHeader namespace="Auth.Login" />

      <form>
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
            <label htmlFor="floating_standard" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Login.email")}</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
            <label htmlFor="floating_standard" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Login.password")}</label>
        </div>
        <Link href={"signup"} className="block text-sm mb-5 font-medium text-main hover:underline "> {t("Login.forgotPassword")}</Link>
        <button type="submit" className="text-white bg-main cursor-pointer px-2 md:px-5 py-2 bg-main text-white hover:bg-main/10 hover:text-main rounded-md transition">{t("Login.btn")}</button>
      </form>
    </div>
  )
}

export default LoginPage
