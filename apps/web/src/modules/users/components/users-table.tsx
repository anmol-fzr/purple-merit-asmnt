import type { ColumnDef } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/table/data-table";
import { useGetUsers } from "../hooks/queries";
import type { User } from "../api";
import { ActiveBadge } from "./active-badge";
import { InActiveBadge } from "./inactive-badge";
import { AdminBadge } from "./admin-badge";
import { UserBadge } from "./user-badge";

export function UsersTable() {
  const { users, isFetching, fetchNextPage } = useGetUsers();

  const data = useMemo(
    () => users?.pages?.flatMap((page) => page.data),
    [users],
  );

  const currRows = useMemo(
    () =>
      users.pages.reduce((prev, curr) => {
        return prev + (curr?.data?.length ?? 0);
      }, 0),
    [users],
  );

  const totalRows = useMemo(
    () => users?.pages?.[0]?.paginate?.total ?? 0,
    [users],
  );

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        cell: ({ row }) => {
          const { _id } = row.original;
          return <p className="text-muted-foreground">{_id}</p>;
        },
      },
      {
        accessorKey: "fullName",
        header: "Name",
      },
      // {
      //   accessorKey: "phoneNumber",
      //   header: "Phone Number",
      //   cell: ({ row }) => {
      //     const { phoneNumber = "" } = row.original;
      //     if (isNull(phoneNumber)) {
      //       return <TableColNaValue />;
      //     }
      //     return phoneNumber;
      //   },
      // },
      {
        accessorKey: "email",
        header: "Email Address",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const { role } = row.original;
          return role === "admin" ? <AdminBadge /> : <UserBadge />;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const { status } = row.original;
          return status === "active" ? <ActiveBadge /> : <InActiveBadge />;
        },
      },
      // {
      // 	id: "verified",
      // 	accessorKey: "verified",
      // 	header: "verified",
      // 	cell: ({ row }) => {
      // 		const { phoneNumberVerified } = row.original;
      // 		return <UserVerificationBadge isVerified={phoneNumberVerified} />;
      // 	},
      // },
      // {
      //   accessorKey: "createdAt",
      //   header: "CreatedAt",
      //   cell: TableColCreatedAt,
      // },
      // {
      //   accessorKey: "updatedAt",
      //   header: "UpdatedAt",
      //   cell: TableColUpdatedAt,
      // },
      // {
      //   id: "actions",
      //   header: "Actions",
      //   enableHiding: false,
      //   cell: ({ row }) => {
      //     const { id } = row.original;
      //
      //     const handleBan = () => {
      //       handleBanOpen(id);
      //     };
      //
      //     const handleDelete = () => {
      //       handleDeleteOpen(id);
      //     };
      //
      //     return (
      //       <DropdownMenu>
      //         <DropdownMenuTrigger asChild>
      //           <Button variant="ghost" className="h-8 w-8 p-0">
      //             <span className="sr-only">Open menu</span>
      //             <MoreHorizontal />
      //           </Button>
      //         </DropdownMenuTrigger>
      //         <DropdownMenuContent align="end">
      //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //           <DropdownMenuItem>Change User Password</DropdownMenuItem>
      //           <DropdownMenuItem>Impersonate User</DropdownMenuItem>
      //           <DropdownMenuSeparator />
      //           <DropdownMenuItem variant="destructive" onClick={handleBan}>
      //             Ban User
      //           </DropdownMenuItem>
      //           <DropdownMenuItem variant="destructive" onClick={handleDelete}>
      //             Delete User
      //           </DropdownMenuItem>
      //         </DropdownMenuContent>
      //       </DropdownMenu>
      //     );
      //   },
      // },
    ],
    [],
  );

  const table = useReactTable<User>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex gap-4">
        {/*
        <TableSearch searchQueryParamKey={queryParamKey} />
        */}
      </div>
      <DataTable
        {...{ table, isFetching, fetchNextPage, currRows, totalRows }}
      />
    </>
  );
}
