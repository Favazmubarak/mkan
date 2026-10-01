import { getAuthenticatedAdmin } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

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
  const { user } = await getAuthenticatedAdmin();

  return (
    <AdminLayoutClient userEmail={user?.email}>
      {children}
    </AdminLayoutClient>
  );
}
