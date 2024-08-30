'use client'
import auth from "@/utils/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const user = auth.getUserInfo()
  if (!user) { 
    redirect("/login")
  }
  redirect("/dashboard");
}
