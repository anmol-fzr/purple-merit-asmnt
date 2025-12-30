import { Page } from "@/components/page";
import { useUserProfile } from "@/modules/auth/hooks/queries";
import { UserProfile } from "@/modules/profile/components/user-profile";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useUserProfile();

  return (
    <Page>
      <Page.Header>
        <Page.Title title="Profile" />
      </Page.Header>
      <Page.Content>
        <Suspense fallback={<p>Loading ...</p>}>
          <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <UserProfile data={data.data} />
          </div>
        </Suspense>
      </Page.Content>
    </Page>
  );
}
