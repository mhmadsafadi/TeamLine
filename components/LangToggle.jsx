"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const PalestineFlag = () => (
  <svg width={25} height={20} viewBox="0 0 30 20" fill="none">
    <path d="M30 0.000366211H0V19.9997H30V0.000366211Z" fill="#F0F0F0" />
    <path d="M30 0.000366211H0V6.6668H30V0.000366211Z" fill="black" />
    <path d="M30 13.3333H0V19.9997H30V13.3333Z" fill="#6DA544" />
    <path d="M15 10.0004L0 20V0L15 10.0004Z" fill="#D80027" />
  </svg>
);

const UKFlag = () => (
  <svg width={25} height={20} viewBox="0 0 30 20" fill="none">
    <path d="M30 0.00012207H0V20H30V0.00012207Z" fill="#F0F0F0" />
    <path d="M16.875 0H13.125V8.1248H0V11.8747H13.125V19.9995H16.875V11.8747H30V8.1248H16.875V0Z" fill="#D80027" />
    <path d="M23.0742 13.4779L30.0009 17.326V13.4779H23.0742Z" fill="#0052B4" />
    <path d="M18.2617 13.4779L30.0009 19.9995V18.1554L21.5813 13.4779H18.2617Z" fill="#D80027" />
    <path d="M26.8739 19.9995L18.2617 15.2146V19.9995H26.8739Z" fill="#0052B4" />
    <path d="M5.29341 13.4778L0 16.4185V13.4778H5.29341Z" fill="#0052B4" />
    <path d="M11.7397 14.3071V19.9995H1.49414L11.7397 14.3071Z" fill="#0052B4" />
    <path d="M8.41951 13.4779L0 18.1554V19.9995L11.7391 13.4779H8.41951Z" fill="#D80027" />
    <path d="M6.92665 6.52159L0 2.67346V6.52159H6.92665Z" fill="#0052B4" />
    <path d="M11.7391 6.52159L0 0V1.84414L8.41951 6.52159H11.7391Z" fill="#D80027" />
    <path d="M3.12695 0L11.7392 4.78491V0H3.12695Z" fill="#0052B4" />
    <path d="M24.707 6.5217L30.0004 3.58093V6.5217H24.707Z" fill="#0052B4" />
    <path d="M18.2617 5.69233V0H28.5072L18.2617 5.69233Z" fill="#0052B4" />
    <path d="M21.5813 6.52159L30.0009 1.84414V0L18.2617 6.52159H21.5813Z" fill="#D80027" />
  </svg>
);

export const LangToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const isAr = locale === "ar";

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 font-semibold rounded-md bg-transparent cursor-pointer transition hover:bg-main/10"
    >
      {!isAr ? <PalestineFlag /> : <UKFlag />}
      <span className="text-sm md:text-base font-medium text-main">
        {!isAr ? "العربية" : "English"}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  );
};