"use client";

import Image from "next/image";
import { useState } from "react";

const UserAvatar = ({
  avatarUrl,
  fullName,
  size = "md",
  onClick,
  uploading = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-2xl",
  };

  const initials = fullName?.charAt(0).toUpperCase() || "U";
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`relative ${sizeClass} rounded-full shrink-0 ${onClick ? "cursor-pointer group" : ""}`}
      onClick={onClick}
    >
      {avatarUrl ? (
        <>
          {/* Skeleton يظهر حتى تتحمل الصورة */}
          {(!imageLoaded || uploading) && (
            <div
              className={`absolute inset-0 rounded-full bg-gray-200 animate-pulse z-10`}
            />
          )}

          <Image
            src={avatarUrl}
            alt={fullName || "avatar"}
            fill
            className={`rounded-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="64px"
            onLoad={() => setImageLoaded(true)}
          />
        </>
      ) : (
        /* Initials لما ما في صورة */
        <div
          className={`${sizeClass} rounded-full bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white font-bold`}
        >
          {initials}
        </div>
      )}

      {/* Camera overlay عند hover — فقط لما يكون onClick موجود */}
      {onClick && (
        <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1V8a2 2 0 0 0-2-2h-.5L15 4H9L7.5 6H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
