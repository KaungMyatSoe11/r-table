import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const SignInPage = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signIn("credentials", {
            email: "job.kaung30@gmail.com",
            password: "admin123",
            callbackUrl: "/",
          });
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default SignInPage;
