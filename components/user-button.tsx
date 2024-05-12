"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { SignOut } from "./auth-components";

export default function UserButton({ session }: { session?: any }) {
  if (!session?.user) return null;
  return (
    <div className="flex gap-2 items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            {session?.user?.name}
            <Avatar
              src={
                session?.user?.image ??
                "https://source.boringavatars.com/marble/120"
              }
              alt={session?.user?.name ?? ""}
            ></Avatar>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownSection title="Profile" showDivider>
            <DropdownItem key="name">{session?.user?.name}</DropdownItem>
            <DropdownItem key="email">{session?.user?.email}</DropdownItem>
          </DropdownSection>
          <DropdownSection title="SignOut">
            <DropdownItem key="sign-out" className="text-danger" color="danger">
              <SignOut />
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
