"use client";

import React from "react";

export function SignInButton() {
  function handleSignIn() {
    // Navigate to NextAuth sign-in endpoint (provider selection / redirect)
    window.location.href = "/api/auth/signin";
  }

  return (
    <button
      onClick={handleSignIn}
      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
    >
      Sign In
    </button>
  );
}

export default SignInButton;
