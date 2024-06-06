"use client";
import { OrganizationSwitcher, UserProfile } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  return (
    <div className="p-4 border-b bg-gray-50">
      <div className="flex justify-between items-center">
        <p>File drive</p>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
