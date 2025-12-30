import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { Role } from "@/modules/auth/api";
import { UserRoleBadge } from "@/modules/users/components/user-role-badge";

interface LinkContent {
  to: string;
  label: string;
  forRole: Role[];
}

export default function Header() {
  const { user } = useAuth();

  const links: LinkContent[] = [
    { to: "/", label: "Home", forRole: ["user", "admin"] },
    { to: "/dashboard/users", label: "Users", forRole: ["admin"] },
    { to: "/dashboard/profile", label: "Profile", forRole: ["user", "admin"] },
  ] as const;
  const { logout } = useAuth();

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label, forRole }) => {
            if (forRole.includes(user?.role)) {
              return (
                <Link key={to} to={to}>
                  {label}
                </Link>
              );
            }
            return <></>;
          })}
        </nav>

        <div className="flex items-center gap-2">
          <UserRoleBadge role={user.role} />
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
