import { memo } from "react";
import { ColorBadge } from "@/components/badge/color-badge";

export const UserBadge = memo(() => {
  return (
    <ColorBadge
      color="blue"
      tooltip="User"
      title="User"
      Icon={() => <span></span>}
    />
  );
});
