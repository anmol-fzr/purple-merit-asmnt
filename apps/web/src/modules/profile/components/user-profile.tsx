import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { UserRoleBadge } from "@/modules/users/components/user-role-badge";
import { UserStatysBadge } from "@/modules/users/components/user-status-badge";
import type { UserStatus } from "@/modules/users/api";
import type { Role } from "@/modules/auth/api";

interface UserProfileProps {
  data: {
    fullName: string;
    email: string;
    status: UserStatus;
    role: Role;
    lastLogin: string; // ISO Date string
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className="flex flex-col">
          <CardTitle className="text-xl">{data.fullName}</CardTitle>
          <CardDescription>{data.email}</CardDescription>
          <div className="flex gap-2 mt-2">
            <UserStatysBadge status={data.status} />
            <UserRoleBadge role={data.role} />
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-4 pt-6 text-sm">
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">User Role</span>
          <span className="font-medium text-foreground">{data.role}</span>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">Last Login</span>
          <span className="font-medium text-foreground">
            {formatDate(data.lastLogin)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">Member Since</span>
          <span className="font-medium text-foreground">
            {formatDate(data.createdAt)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">Last Profile Update</span>
          <span className="font-medium text-foreground">
            {formatDate(data.updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
