import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminPage from "components/Admin";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 페이지"
};

export default async function Admin() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login?callbackUrl=/admin");
  }

  return <AdminPage />;
}
