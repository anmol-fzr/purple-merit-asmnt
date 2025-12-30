import type { LucideIcon } from "lucide-react";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const colorStyles = {
  green:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-200 border-green-200 dark:border-green-800",
  red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 border-red-200 dark:border-red-800",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

type BadgeColor = keyof typeof colorStyles;

type StatusBadgeProps = {
  Icon: LucideIcon;
  title: string;
  tooltip: string;
  color: BadgeColor;
};

export const ColorBadge = memo(
  ({ title, tooltip, Icon, color }: StatusBadgeProps) => {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className={cn("flex gap-1.5 items-center", colorStyles[color])}
          >
            <Icon className="h-3.5 w-3.5" />
            {title}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  },
);
