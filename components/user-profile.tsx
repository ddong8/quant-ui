import { Button } from "@nextui-org/react";
import { auth } from "../app/api/auth";
import { SignIn, SignOut } from "./auth-components";
import UserButton from "./user-button";

export default async function UserProfile() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <UserButton session={session} />
      {/* <Button variant="ghost" className="relative w-8 h-8 rounded-full">
        {session.user.name ?? ""}
      </Button> */}
      {/* <SignOut /> */}
    </div>
  );
}
