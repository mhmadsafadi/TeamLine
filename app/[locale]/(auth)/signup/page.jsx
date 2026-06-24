import { useTranslations } from "next-intl";
import AuthTitleHeader from "../components/AuthTitleHeader";

const SignUage = () => {
    const t = useTranslations("Auth");
  
  return (
    <div className="max-w-md mx-auto">
      <AuthTitleHeader namespace="Auth.Signup" />
      <form>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
              <label htmlFor="floating_first_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Signup.firstName")}</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
              <label htmlFor="floating_last_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Signup.lastName")}</label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
            <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Signup.email")}</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
            <label htmlFor="floating_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Signup.password")}</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
            <label htmlFor="floating_repeat_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{t("Signup.confirmPassword")}</label>
        </div>
        
        
        <button type="submit" className="text-white bg-main cursor-pointer px-2 md:px-5 py-2 bg-main text-white hover:bg-main/10 hover:text-main rounded-md transition">{t("Signup.btn")}</button>
      </form>
    </div>

  )
}

export default SignUage
