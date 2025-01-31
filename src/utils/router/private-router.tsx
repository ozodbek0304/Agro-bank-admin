import React from "react";
import { useAppSelector } from "@/store/store";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";

interface AppProps {
  children: React.ReactNode
}

export function PrivateRouter({ children }: AppProps) {
  const { isLogin } = useAppSelector(state => state.auth)

  if (isLogin) {
    return <SidebarLayout>{children}</SidebarLayout>
  } else {
    return <AuthLayout>{children}</AuthLayout>
  }
}