import { auth } from "../app/api/auth";
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
      <CustomTable />
    </div>
  );
}
