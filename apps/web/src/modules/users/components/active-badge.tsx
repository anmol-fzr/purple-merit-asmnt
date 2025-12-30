import { memo } from "react";
import { ColorBadge } from "@/components/badge/color-badge";

export const ActiveBadge = memo(() => {
  return (
    <ColorBadge
      color="green"
      tooltip="User is Active"
      title="Active"
      Icon={() => <span></span>}
    />
  );
});
