"use client";

export default function SocialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl text-main font-semibold">Contact Me</h2>

          <button onClick={onClose} className="rounded-lg py-2 px-4 cursor-pointer hover:bg-red-100 hover:text-red-500">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <a
            href="https://github.com/mhmadsafadi"
            target="_blank"
            className="block rounded-xl border border-gray-400 p-3 transition hover:bg-gray-100"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/mohammed-al-safadi-6749021bb/"
            target="_blank"
            className="block rounded-xl border border-gray-400 p-3 transition hover:bg-gray-100"
          >
            LinkedIn
          </a>

          <a
            href="https://www.facebook.com/mohammed.alsafady.5"
            className="block rounded-xl border border-gray-400 p-3 transition hover:bg-gray-100"
          >
            Facebook
          </a>

          <a
            href="https://www.instagram.com/mhmad_safadi"
            target="_blank"
            className="block rounded-xl border border-gray-400 p-3 transition hover:bg-gray-100"
          >
            Intagram
          </a>
          <a
            href="https://wa.me/970595317954"
            target="_blank"
            className="block rounded-xl border border-gray-400 p-3 transition hover:bg-gray-100"
          >
            Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
}
