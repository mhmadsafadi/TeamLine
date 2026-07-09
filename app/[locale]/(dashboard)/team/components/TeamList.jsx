"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import InviteMemberModal from "./InviteMemberModal";
import { createClient } from "@/lib/supabase/client";

const TeamList = ({ members, workspaceId, currentUserId }) => {
  const t = useTranslations("Dashboard.Team");
  const locale = useLocale();
  const [showInvite, setShowInvite] = useState(false);
  const [memberList, setMemberList] = useState(members);

  const isOwner =
    memberList.find((m) => m.user_id === currentUserId)?.role === "owner";

  const handleRemove = async (memberId, userId) => {
    if (userId === currentUserId) return;
    const supabase = createClient();
    await supabase.from("workspace_members").delete().eq("id", memberId);
    setMemberList((prev) => prev.filter((m) => m.id !== memberId));
  };

  return (
    <>
      {isOwner && (
        <div className="flex justify-end -mt-[70px] mb-5">
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12h4m-2-2v4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            {t("invite")}
          </button>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {memberList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="w-12 h-12 text-gray-300 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p className="text-gray-500 font-medium">{t("empty")}</p>
          </div>
        ) : (
          memberList.map((member, i) => (
            <div
              key={member.id}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition ${
                i !== memberList.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-lg shrink-0 overflow-hidden">
                {member.avatar_url ? (
                  <Image
                    src={member.avatar_url}
                    alt={member.full_name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-main to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {member.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {member.full_name}
                  </p>
                  {member.user_id === currentUserId && (
                    <span className="text-xs sm:text-sm text-gray-500">({t("you")})</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{member.email}</p>
              </div>

              {/* Role */}
              <span
                className={`text-xs sm:text-sm px-2.5 py-1 rounded-full font-medium shrink-0 ${
                  member.role === "owner"
                    ? "bg-main/10 text-main"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {member.role === "owner" ? t("owner") : t("member")}
              </span>

              {/* Joined */}
              <span className="text-sm text-gray-400 shrink-0 hidden md:block">
                {new Date(member.joined_at).toLocaleDateString(
                  locale === "ar" ? "ar-EG" : "en-US",
                  { year: "numeric", month: "short", day: "numeric" },
                )}
              </span>

              {/* Remove */}
              {isOwner && member.user_id !== currentUserId && (
                <button
                  onClick={() => handleRemove(member.id, member.user_id)}
                  className="text-gray-300 hover:text-red-400 transition cursor-pointer shrink-0"
                  title={t("remove")}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {showInvite && (
        <InviteMemberModal
          workspaceId={workspaceId}
          onClose={() => setShowInvite(false)}
          onInvited={(newMember) => {
            setMemberList((prev) => [...prev, newMember]);
            setShowInvite(false);
          }}
        />
      )}
    </>
  );
};

export default TeamList;
