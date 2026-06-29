import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "next-intl";

const SocialAuthButtons = () => {
    const t = useTranslations("Auth.Social");
    const locale = useLocale();

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/${locale}/auth/callback`,
            },
        })
        if (error) console.error(error.message);
    }
    const handleGithubLogin = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
            redirectTo: `${window.location.origin}/${locale}/auth/callback`,
            },
        });
        if (error) console.error(error.message);
    }
  return (
    <div className="flex flex-col gap-3 w-full">
        <div className="relative flex items-center mt-6 mb-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-gray-400 text-sm font-medium uppercase">{t("or")}</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Google Button */}
        <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 w-full px-5 py-2 cursor-pointer rounded-md font-medium border border-white text-gray-700 bg-gray-200 hover:border-[#ea4335] hover:bg-gray-50 transition">
            <svg viewBox="0 0 24 24" className="size-6">
                <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.4-.2-2H12v3.8h6a5.1 5.1 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.6 3.3-7.8Z" />
                <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.9l-3.5-2.7c-1 .6-2.1 1-3.8 1a6.5 6.5 0 0 1-6.1-4.5H2.3v2.8A11 11 0 0 0 12 23Z" />
                <path fill="#FBBC05" d="M5.9 13.9a6.7 6.7 0 0 1 0-3.8V7.3H2.3a11 11 0 0 0 0 9.4l3.6-2.8Z" />
                <path fill="#EA4335" d="M12 5.6c1.6 0 3 .6 4.1 1.6l3.1-3.1A10.5 10.5 0 0 0 12 1a11 11 0 0 0-9.7 6.3l3.6 2.8A6.5 6.5 0 0 1 12 5.6Z" />
            </svg>
            <span>{t("continueWithGoogle")}</span>
        </button>

        {/* GitHub Button */}
        <button onClick={handleGithubLogin} className="flex items-center justify-center gap-3 w-full px-5 py-2 cursor-pointer rounded-md font-medium border border-white text-gray-700 bg-gray-200 hover:border-black hover:bg-gray-50 transition">
            <svg viewBox="0 0 98 96" className="size-6" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.9 0C21.9 0 0 22 0 49.2c0 21.8 14 40.2 33.4 46.7 2.4.5 3.3-1.1 3.3-2.4 0-1.2-.1-5.2-.1-9.4-13.6 3-16.5-5.9-16.5-5.9-2.2-5.7-5.4-7.2-5.4-7.2-4.4-3 .3-3 .3-3 4.9.3 7.5 5.1 7.5 5.1 4.4 7.5 11.5 5.3 14.3 4.1.4-3.2 1.7-5.3 3.1-6.5-10.9-1.2-22.3-5.5-22.3-24.3 0-5.4 1.9-9.8 5-13.2-.5-1.2-2.2-6.2.5-13 0 0 4.1-1.3 13.4 5a46.5 46.5 0 0 1 24.4 0c9.3-6.3 13.4-5 13.4-5 2.7 6.8 1 11.8.5 13 3.1 3.4 5 7.8 5 13.2 0 18.9-11.5 23-22.4 24.3 1.8 1.6 3.4 4.6 3.4 9.3 0 6.7-.1 12.1-.1 13.8 0 1.3.9 2.9 3.4 2.4A49.2 49.2 0 0 0 97.8 49.2C97.8 22 75.9 0 48.9 0Z"
                />
            </svg>
            <span>{t("continueWithGithub")}</span>
        </button>
    </div>
  )
}

export default SocialAuthButtons
