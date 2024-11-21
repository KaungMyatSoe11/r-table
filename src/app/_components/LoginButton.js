"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <h1>Signed in as {session.user.name} </h1> <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
