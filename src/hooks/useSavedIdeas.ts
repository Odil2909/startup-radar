"use client";

import { useEffect, useState } from "react";
import type { Idea } from "@/lib/idea-engine";

const KEY = "opportunity_radar_saved_ideas_v1";

export function useSavedIdeas(namespace?: string) {
  const storageKey = namespace ? `${KEY}_${namespace}` : KEY;
  const [items, setItems] = useState<Idea[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {
      console.error(err);
    }
  }, [storageKey]);

  function save(newItems: Idea[]) {
    setItems(newItems);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newItems));
    } catch (err) {
      console.error(err);
    }
  }

  function add(item: Idea) {
    if (items.find((i) => i.id === item.id)) return;
    save([...items, item]);
  }

  function remove(id: string) {
    save(items.filter((i) => i.id !== id));
  }

  function clear() {
    save([]);
  }

  return { items, add, remove, clear };
}
