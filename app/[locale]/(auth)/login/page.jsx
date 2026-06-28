"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import AuthTitleHeader from "../components/AuthTitleHeader";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import SocialAuthButtons from "../components/SocialAuthButtons";

const LoginPage = () => {
  const t = useTranslations("Auth");
  const v = useTranslations("Validation");
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema(v)),
  });

  const onSubmit = async (formData) => {
    setServerError("");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }
    router.refresh();
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="max-w-md mx-auto">
      <AuthTitleHeader namespace="Auth.Login" />

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="floating_email"
            {...register("email")}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label htmlFor="floating_email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            {t("Login.email")}
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="floating_password"
            {...register("password")}
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label htmlFor="floating_password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            {t("Login.password")}
          </label>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <Link
          href={`/${locale}/forgot-password`}
          className="block text-sm mb-5 font-medium text-main hover:underline"
        >
          {t("Login.forgotPassword")}
        </Link>

        {/* Server Error */}
        {serverError && (
          <p className="mb-4 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-md">
            ❌ {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 text-white bg-main cursor-pointer px-5 py-2 hover:bg-main/10 hover:text-main rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size={4} color="white" />
              {locale === "ar" ? "جارٍ التحميل..." : "Loading..."}
            </div>
          ) : (
            t("Login.btn") // أو t("Signup.btn")
          )}
        </button>
      </form>
      <SocialAuthButtons />
    </div>
  );
};

export default LoginPage;