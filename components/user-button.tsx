import { Button } from "@nextui-org/react";
import { auth } from "../app/api/auth";
import { SignIn, SignOut } from "./auth-components";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <Button variant="ghost" className="relative w-8 h-8 rounded-full">
        {session.user.name ?? ""}
      </Button>
      <SignOut />
    </div>
  );
}
