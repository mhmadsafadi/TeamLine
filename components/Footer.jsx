"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import SocialModal from "./SocialModal";

const Footer = () => {
    const [open, setOpen] = useState(false);
    const t = useTranslations("Footer");
    return (
        <footer className="bg-white">
            <div className="container p-4 md:py-8">
                <div className="flex justify-between items-center">
                    <Logo />
                    <button onClick={() => setOpen(true)} className="font-semibold text-md cursor-pointer text-main">
                        {t("devContactBtn")}
                    </button>
                </div>
                <hr className="my-5 border-gray-400 sm:mx-auto" />
                <span className="block text-sm text-center">
                    {t("text")}{" "}
                    <a href="https://www.linkedin.com/in/mohammed-al-safadi-6749021bb/" className="font-semibold text-main hover:underline">
                        {t("devName")}
                    </a>
                    {" "}© 2026
                </span>
                <SocialModal isOpen={open} onClose={() => setOpen(false)}/>
            </div>
        </footer>
    );
};

export default Footer;
