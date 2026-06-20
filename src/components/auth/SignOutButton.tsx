"use client";

import React from "react";
import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
    >
      Sign Out
    </button>
  );
}
