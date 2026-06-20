"use client";

import { supabase } from "../../../lib/supabase";

export default function TestDB() {
  async function test() {
    console.log("Supabase connected:", supabase);
    alert("Supabase works!");
  }

  return <button onClick={test}>Test Supabase</button>;
}

