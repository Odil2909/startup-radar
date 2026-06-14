"use client";

import React, { useEffect, useState } from "react";

export function ProfileSettings({ email }: { email?: string | null }) {
  const key = email
    ? `sr_profile_settings_${encodeURIComponent(email)}`
    : "sr_profile_settings";
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as { displayName?: string };
        if (parsed.displayName) setDisplayName(parsed.displayName);
      }
    } catch (e) {
      // ignore
    }
  }, [key]);

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify({ displayName }));
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="rounded-lg border border-white/6 bg-card p-4">
      <div className="text-sm text-muted">Profile Settings</div>

      <div className="mt-3 space-y-2">
        <label className="block text-sm">Display name</label>
        <input
          className="w-full rounded-md border border-white/6 bg-background/60 px-3 py-2 text-sm text-white"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Preferred display name"
        />

        <div className="pt-2">
          <button
            onClick={save}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
