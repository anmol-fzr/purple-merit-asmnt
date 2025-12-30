import { Page } from "@/components/page";
import { protectRoute } from "@/lib/auth";
import { UsersTable } from "@/modules/users/components/users-table";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/dashboard/users")({
  beforeLoad: () => {
    protectRoute("admin");
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <Page.Header>
        <Page.Title title="Users" />
      </Page.Header>
      <Page.Content>
        <Suspense fallback={<p>Loading ...</p>}>
          <UsersTable />
        </Suspense>
      </Page.Content>
    </Page>
  );
}
