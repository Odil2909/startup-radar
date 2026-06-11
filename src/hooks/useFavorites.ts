"use client";

import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunity";

const STORAGE_KEY = "opportunity_radar_favorites_v1";

export function useFavorites() {
  const [items, setItems] = useState<Opportunity[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (err) {
      console.error(err);
    }
  }, []);

  function save(newItems: Opportunity[]) {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (err) {
      console.error(err);
    }
  }

  function add(item: Opportunity) {
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
