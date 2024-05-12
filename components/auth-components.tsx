import { signIn, signOut } from "../app/api/auth";
import { Button } from "@nextui-org/react";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
