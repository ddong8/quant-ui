import { auth } from "../app/api/auth";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

const CustomTable = dynamic(() => import("@/components/table"), { ssr: false });

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className="text-center">
        <span>请登录先!</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <SessionProvider session={session}>
        <CustomTable />
      </SessionProvider>
    </div>
  );
}
