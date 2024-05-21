"use client";

import { SignIn } from "../auth-components";
import UserButton from "./user-button";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();
  if (!session) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <UserButton />
    </div>
  );
}
