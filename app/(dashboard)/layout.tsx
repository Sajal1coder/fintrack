import type { PropsWithChildren } from "react";

import { Header } from "@/components/header";
export const dynamic = 'force-dynamic'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;