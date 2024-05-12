import { auth } from "../app/api/auth";
import { SignIn } from "./auth-components";
import UserButton from "./user-button";

export default async function UserProfile() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <UserButton session={session} />
    </div>
  );
}
