import React from "react";
import Link from "next/link";
import HistoryClient from "@/components/validate/HistoryClient";

export default function ValidationHistoryPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Validation History</h1>
      <HistoryClient />
      <div className="mt-6">
        <Link href="/validate" className="text-sm text-blue-600">
          Back to validator
        </Link>
      </div>
    </main>
  );
}
