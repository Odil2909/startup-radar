import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileStats from "@/components/profile/ProfileStats";
import RecentSavedIdeas from "@/components/profile/RecentSavedIdeas";
import RecentValidationHistory from "@/components/profile/RecentValidationHistory";
import WatchlistCategories from "@/components/profile/WatchlistCategories";
import ProfileSettings from "@/components/profile/ProfileSettings";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect to NextAuth sign-in if not authenticated
    redirect("/api/auth/signin");
  }

  const { user } = session;
  const createdAt = (user as { createdAt?: string })?.createdAt;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="mt-6 flex items-center gap-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? "avatar"}
            className="h-16 w-16 rounded-full sm:h-24 sm:w-24"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/6 text-2xl font-semibold sm:h-24 sm:w-24 sm:text-3xl">
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        <div>
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-muted">{user.email}</div>
          {createdAt && (
            <div className="mt-1 text-xs text-muted">
              Account created: {new Date(createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <ProfileStats email={user.email ?? null} />

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <RecentSavedIdeas email={user.email ?? null} />
          <RecentValidationHistory email={user.email ?? null} />
        </div>

        <div className="space-y-4">
          <WatchlistCategories />
          <ProfileSettings email={user.email ?? null} />
        </div>
      </div>
    </div>
  );
}
