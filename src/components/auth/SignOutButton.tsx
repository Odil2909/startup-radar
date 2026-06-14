"use client";

import React from "react";

export function SignOutButton() {
  async function handleSignOut() {
    try {
      // Post to the NextAuth signout endpoint to clear the session
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (e) {
      // fallback to navigation
    }
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
    >
      Logout
    </button>
  );
}

export default SignOutButton;
