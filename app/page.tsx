import { auth } from "../app/api/auth";
import { SignIn, SignOut } from "../components/auth-components";
import Trade from "@/components/trade";

export default async function Home() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex flex-col gap-4">
      <Trade />
    </div>
  );
}
