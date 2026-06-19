// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-80">
        <h1 className="text-2xl font-bold mb-2">Dashboard Ojol</h1>
        <p className="text-gray-500 mb-6">Silakan login untuk melanjutkan</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          <span className="font-medium text-gray-700">Login dengan Google</span>
        </button>
      </div>
    </div>
  );
}