"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function Avatar({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {
  const fallback = name ? name.charAt(0).toUpperCase() : "?";
  if (image)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "avatar"}
        className="h-8 w-8 rounded-full"
      />
    );

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
      {fallback}
    </div>
  );
}

export function UserMenu({ name, email, image }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-full px-2 py-1 hover:opacity-90"
        aria-label="Account"
      >
        <Avatar name={name} image={image} />
        <span className="hidden text-sm font-medium lg:block">
          {name ?? "Account"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-white/10 bg-background p-3 shadow-lg">
          <div className="mb-2 text-sm">
            <div className="truncate font-semibold">{name}</div>
            <div className="truncate text-xs text-muted-foreground">
              {email}
            </div>
          </div>

          <nav className="mb-3 flex flex-col gap-1">
            <Link
              href="/profile"
              className="rounded-md px-2 py-2 text-sm hover:bg-white/5"
            >
              Profile
            </Link>
            <Link
              href="/ideas"
              className="rounded-md px-2 py-2 text-sm hover:bg-white/5"
            >
              Saved Ideas
            </Link>
            <Link
              href="/validation-history"
              className="rounded-md px-2 py-2 text-sm hover:bg-white/5"
            >
              Validation History
            </Link>
          </nav>

          <div>
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
