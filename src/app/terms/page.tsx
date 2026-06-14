import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Opportunity Radar",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>Last Updated: June 2026</CardDescription>
        </CardHeader>

        <CardContent>
          <section className="prose prose-invert max-w-none">
            <p>By using Opportunity Radar, you agree to these terms.</p>

            <h2>Use of Service</h2>
            <p>You may use the platform for personal and business research purposes.</p>

            <h2>User Accounts</h2>
            <p>Users are responsible for maintaining the security of their accounts.</p>

            <h2>Content</h2>
            <p>
              Opportunity Radar provides informational content and trend analysis.
              We do not guarantee business success or financial results.
            </p>

            <h2>Availability</h2>
            <p>We may modify or discontinue features at any time.</p>

            <h2>Contact</h2>
            <p>
              For questions regarding these terms:
              <br />
              Email: <a href="mailto:odylabduhamidov@gmail.com">odylabduhamidov@gmail.com</a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
