"use server";

import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

const DEFAULT_USERNAME = process.env.AUTH_USERNAME || "admin";
const DEFAULT_PASSWORD = process.env.AUTH_PASSWORD || "bOgm38QC3HdFMtH9";

export type FormState = {
  error?: string;
  success?: boolean;
} | null;

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Пожалуйста, заполните все поля." };
  }

  if (username !== DEFAULT_USERNAME || password !== DEFAULT_PASSWORD) {
    return { error: "Неверное имя пользователя или пароль." };
  }

  await createSession(username);
  redirect("/");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
