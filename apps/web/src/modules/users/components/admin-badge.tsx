import { memo } from "react";
import { ColorBadge } from "@/components/badge/color-badge";

export const AdminBadge = memo(() => {
  return (
    <ColorBadge
      color="yellow"
      tooltip="Administrator"
      title="Administrator"
      Icon={() => <span></span>}
    />
  );
});
