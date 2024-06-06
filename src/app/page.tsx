"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { organization } = useOrganization();
  const user = useUser();
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.readFile,
    organization
      ? { orgId: organization.id }
      : user
        ? { orgId: String(user.user?.id) }
        : "skip"
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      {files?.map((file) => (
        <p key={file._id} style={{ color: "#111", fontSize: "24px" }}>
          {file.name}
        </p>
      ))}

      <Button
        onClick={() => {
          if (!organization)
            createFile({
              name: "Hello World :)",
              orgId: String(user.user?.id),
            });
          else {
            createFile({ name: "Hello World :)", orgId: organization?.id });
          }
        }}
      >
        Create File
      </Button>
    </main>
  );
}
