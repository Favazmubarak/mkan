import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Access | MKAN Concept",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
