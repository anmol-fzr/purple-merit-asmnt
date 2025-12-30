import { memo } from "react";
import { ColorBadge } from "@/components/badge/color-badge";

export const InActiveBadge = memo(() => {
  return (
    <ColorBadge
      color="red"
      tooltip="User is Inactive"
      title="Inactive"
      Icon={() => <span></span>}
    />
  );
});
