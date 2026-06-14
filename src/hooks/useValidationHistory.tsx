"use client";
import { useEffect, useState } from "react";
import {
  ValidationResult,
  validateIdea,
  preValidateIdea,
} from "../lib/startup-validator";

export type SavedValidation = {
  id: string;
  title: string;
  result: ValidationResult;
  createdAt: string;
};

const STORAGE_KEY = "sr_validation_history_v1";

export function useValidationHistory(namespace?: string) {
  const storageKey = namespace ? `${STORAGE_KEY}_${namespace}` : STORAGE_KEY;
  const [items, setItems] = useState<SavedValidation[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      setItems([]);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items, storageKey]);

  function add(title: string) {
    const pre = preValidateIdea(title);
    if (!pre.valid || pre.confidence <= 50) {
      return null;
    }
    const result = validateIdea(title);
    const entry: SavedValidation = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      result,
      createdAt: new Date().toISOString(),
    };
    setItems((s) => [entry, ...s]);
    return entry;
  }

  function remove(id: string) {
    setItems((s) => s.filter((x) => x.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return { items, add, remove, clear } as const;
}
