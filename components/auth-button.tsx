import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  console.log('user is ', user)
  return user ? (
    <div className="flex items-center gap-4">
      {user.user_metadata?.avatar_url &&
      <Image src={user.user_metadata?.avatar_url} height={50} width={50} className="rounded-full h-6 w" alt="user-image " /> } Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
