"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export function SignIn() {
  return (
    <Button onClick={() => signIn("github", { redirectTo: "/" })}>
      Sign In
    </Button>
  );
}

export function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
