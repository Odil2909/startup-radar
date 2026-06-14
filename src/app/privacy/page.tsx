import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Opportunity Radar",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Last Updated: June 2026</CardDescription>
        </CardHeader>

        <CardContent>
          <section className="prose prose-invert max-w-none">
            <p>Opportunity Radar respects your privacy.</p>

            <h2>Information We Collect</h2>
            <p>When you sign in with Google, we may collect:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture</li>
            </ul>
            <p>
              This information is used only to provide account functionality and
              personalize your experience.
            </p>

            <h2>How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Authenticate users</li>
              <li>Display profile information</li>
              <li>Save user preferences and activity</li>
              <li>Improve the platform</li>
            </ul>

            <h2>Data Sharing</h2>
            <p>
              We do not sell or share your personal information with third
              parties.
            </p>

            <h2>Data Security</h2>
            <p>We take reasonable measures to protect user information.</p>

            <h2>Contact</h2>
            <p>
              For questions regarding this Privacy Policy:
              <br />
              Email:{" "}
              <a href="mailto:odylabduhamidov@gmail.com">
                odylabduhamidov@gmail.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
