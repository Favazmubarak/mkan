"use client";

import { usePathname } from "next/navigation";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page renders standalone without wrappers
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-admin selection:bg-[#DDB78A] selection:text-white">
      {children}
    </div>
  );
}
