import { memo } from "react";
import type { Role } from "@/modules/auth/api";
import { AdminBadge } from "./admin-badge";
import { UserBadge } from "./user-badge";

interface UserRoleBadgeProps {
  role: Role;
}

export const UserRoleBadge = memo((props: UserRoleBadgeProps) => {
  const { role } = props;
  return role === "admin" ? <AdminBadge /> : <UserBadge />;
});
