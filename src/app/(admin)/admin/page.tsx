import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminPage from "components/Admin";
import { getAdminByApiKey } from "utils/auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 페이지"
};

export default async function Admin() {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get("admin_auth")?.value;
  const admin = await getAdminByApiKey(apiKey);

  if (!admin) {
    cookieStore.delete("admin_auth");
    cookieStore.delete("admin_username");
    redirect("/admin/login?callbackUrl=/admin");
  }

  return <AdminPage />;
}
