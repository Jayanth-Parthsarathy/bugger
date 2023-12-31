import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Sidebar from "@/components/custom/dashboard/sidebar";
import {
  adminLinks,
  defaultLinks,
  developerLinks,
  reporterLinks,
  testerLinks,
} from "@/lib/linkdata";
import { getServerAuthSession } from "@/server/auth";
import { DashboardHeader } from "@/components/custom/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bugger",
  description: "A simple bug tracking app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const role = session?.user.role;
  const links =
    role === "ADMIN"
      ? adminLinks
      : role === "DEVELOPER"
      ? developerLinks
      : role === "REPORTER"
      ? reporterLinks
      : role === "TESTER"
      ? testerLinks
      : defaultLinks;
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex p-4`}>
        <Sidebar links={links} />
        <div className="flex-1">
        <DashboardHeader
          session={session}
          heading="Bugger 🐛"
          text="A bug tracking app"
        />
        <Toaster />
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
