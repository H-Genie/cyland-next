import { Metadata } from "next";
import AdminPage from "components/Admin";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 페이지"
};

export default function Admin() {
  return <AdminPage />;
}
