"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import UserAvatar from "../../components/UserAvatar";

// ← هنا خارج الـ component
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" })),
          "image/jpeg",
          0.8
        );
      };
    };
  });
};

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1-7 5-5-1.5-1.5L11 12l-1.5-1.5L8 12l3 3Z"/>
  </svg>
);

const ProfileTab = () => {
  const t = useTranslations("Dashboard.Settings.profile");
  const { user, fetchUser, updateUserMetadata } = useAuthStore();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchUser(); }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.user_metadata?.avatar_url || null);
    }
  }, [user]);

  const fullName = `${firstName} ${lastName}`.trim() || "U";

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(t("avatarInvalidType"));
      return;
    }

    setUploadingAvatar(true);
    setError("");

    // ← الخطوة 1: ضغط الصورة
    const compressedFile = await compressImage(file);

    // ← preview فوري
    const preview = URL.createObjectURL(compressedFile);
    setAvatarPreview(preview);

    const supabase = createClient();

    // ← الخطوة 2: احذف كل الصور القديمة
    const { data: existingFiles } = await supabase.storage
      .from("avatars")
      .list(user.id);

    if (existingFiles?.length > 0) {
      const filesToDelete = existingFiles.map(f => `${user.id}/${f.name}`);
      await supabase.storage.from("avatars").remove(filesToDelete);
    }

    // ← الخطوة 3: ارفع الصورة الجديدة — دائماً avatar.jpg
    const filePath = `${user.id}/avatar.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, compressedFile, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploadingAvatar(false);
      return;
    }

    // ← الخطوة 4: احصل على الـ URL وحدّث
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

    await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    // ← الخطوة 5: حدّث الـ store فوراً بدون refresh
    setAvatarUrl(publicUrl);
    updateUserMetadata({ avatar_url: publicUrl });
    setUploadingAvatar(false);
  };

  const handleSave = async () => {
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    updateUserMetadata({
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`,
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDiscard = () => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setAvatarPreview(null);
    }
  };

  return (
    <div>
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
        <div className="relative">
          <UserAvatar
            avatarUrl={avatarPreview || avatarUrl}
            fullName={fullName}
            size="lg"
            onClick={handleAvatarClick}
            uploading={uploadingAvatar}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <p className="text-base font-medium text-gray-800">{fullName}</p>
          <p className="text-sm text-gray-400 mt-0.5">{email}</p>
          {uploadingAvatar && (
            <p className="text-xs text-main mt-1">{t("uploading")}</p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">{t("firstName")}</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">{t("lastName")}</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-main"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">{t("email")}</label>
        <div className="relative">
          <input
            value={email}
            disabled
            className="w-full py-2.5 px-3 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
          />
          <span className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-green-600">
            <CheckIcon />
            {t("verified")}
          </span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mb-3">❌ {error}</p>}

      {success && (
        <p className="text-sm text-green-600 mb-3 flex items-center gap-1">
          <CheckIcon />
          {t("savedSuccess")}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2.5">
        <button
          onClick={handleDiscard}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          {t("discard")}
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2 text-sm bg-main text-white rounded-lg hover:bg-main/90 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "..." : t("save")}
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;