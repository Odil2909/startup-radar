import type { Metadata } from "next";
import { opportunities } from "@/data/opportunities";
import CompareApp from "@/components/compare/CompareApp";

export const metadata: Metadata = {
  title: "Compare Opportunities",
  description: "Compare two startup opportunities side-by-side",
};

export default function ComparePage() {
  return <CompareApp opportunities={opportunities} />;
}
