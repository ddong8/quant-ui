"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { SignOut } from "./auth-components";

export default function UserButton({ session }: { session?: any }) {
  if (!session?.user) return null;
  return (
    <div className="flex gap-2 items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">{session?.user?.name}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="name">{session?.user?.name}</DropdownItem>
          <DropdownItem key="email">{session?.user?.email}</DropdownItem>
          <DropdownItem key="sign-out" className="text-danger" color="danger">
            <SignOut />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
