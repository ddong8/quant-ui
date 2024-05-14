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

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function UserButton() {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return (
    <div className="flex gap-2 items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            {session?.user?.name ?? ""}
            <Avatar
              showFallback
              name=""
              src={
                session?.user?.image ??
                "https://source.boringavatars.com/marble/120"
              }
              alt={session?.user?.name ?? ""}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownSection title="Profile" showDivider>
            <DropdownItem key="name" description="name">
              {session?.user?.name ?? ""}
            </DropdownItem>
            <DropdownItem key="email" description="email">
              {session?.user?.email ?? ""}
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="SignOut" aria-label="">
            <DropdownItem
              key="SignOut"
              className="text-danger"
              color="danger"
              onPress={() => signOut()}
            >
              Sign Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
