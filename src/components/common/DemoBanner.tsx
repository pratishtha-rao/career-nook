"use client";

import Link from "next/link";

export default function DemoBanner() {
  return (
    <div
      className="
        mb-6
        rounded-xl
        border
        border-yellow-300
        bg-yellow-50
        p-4
        text-center
      "
    >
      <h2 className="font-bold text-yellow-900">
        Demo Mode
      </h2>

      <p className="mt-2 text-sm text-yellow-800">
        You are exploring Career Nook without an
        account. You can try certain features, but
        nothing will be saved. Sign up to access all
        features and save your information. 
      </p>

      <Link
        href="/signup"
        className="
          mt-4
          inline-block
          rounded
          bg-blue-600
          px-5
          py-2
          font-semibold
          text-white
          hover:bg-blue-700
        "
      >
        Create Free Account
      </Link>
    </div>
  );
}