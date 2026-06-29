"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Image from "next/image";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F1EC] px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Decorative solar pulse background pattern */}
      <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#F08A1D]/5 blur-[120px] pointer-events-none animate-solar-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-[#2F343A]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E2DA] shadow-[0_8px_30px_rgb(47,52,58,0.03)] z-10 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(47,52,58,0.06)]">
        {/* Logo and Brand Heading */}
        <div className="flex flex-col items-center">
          <div className="relative mb-6 transition-transform duration-300 hover:scale-102">
            <Image
              src="/logo_v2.png"
              alt="AST Logo"
              width={168}
              height={90}
              className="w-auto h-12 object-contain"
              priority
            />
          </div>
        </div>

        {/* Login Form */}
        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-[#2F343A]/70 mb-1.5"
              >
                Имя пользователя
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="admin"
                  disabled={isPending}
                  className="block w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#F5F1EC]/30 text-[#2F343A] placeholder-[#2F343A]/45 outline-none transition-all duration-300 hover:border-[#F08A1D]/40 focus:border-[#F08A1D] focus:bg-white focus:ring-4 focus:ring-[#F08A1D]/10 text-sm font-medium"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-[#2F343A]/70 mb-1.5"
              >
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  disabled={isPending}
                  className="block w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#F5F1EC]/30 text-[#2F343A] placeholder-[#2F343A]/45 outline-none transition-all duration-300 hover:border-[#F08A1D]/40 focus:border-[#F08A1D] focus:bg-white focus:ring-4 focus:ring-[#F08A1D]/10 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Error Message Box */}
          {state?.error && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium animate-fade-in-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 flex-shrink-0 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold tracking-wide text-white bg-[#F08A1D] hover:bg-[#2F343A] focus:outline-none focus:ring-4 focus:ring-[#F08A1D]/20 transition-all duration-300 shadow-[0_4px_12px_rgba(240,138,29,0.15)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_6px_18px_rgba(47,52,58,0.12)] cursor-pointer"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Проверка...</span>
                </div>
              ) : (
                "Войти"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
