import React from "react";
import Link from "next/link";
import ValidatorClient from "@/components/validate/ValidatorClient";

export default function ValidatePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Startup Validator</h1>
      <ValidatorClient />
      <div className="mt-8">
        <Link href="/validation-history" className="text-sm text-blue-600">
          View validation history
        </Link>
      </div>
    </main>
  );
}
