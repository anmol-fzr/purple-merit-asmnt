import { memo } from "react";
import type { UserStatus } from "../api";
import { ActiveBadge } from "./active-badge";
import { InActiveBadge } from "./inactive-badge";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatysBadge = memo((props: UserStatusBadgeProps) => {
  const { status } = props;
  return status === "active" ? <ActiveBadge /> : <InActiveBadge />;
});
