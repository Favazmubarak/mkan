import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "MKAN Concept | Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated } = await getAuthenticatedAdmin();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
