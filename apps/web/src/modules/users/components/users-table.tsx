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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUpdateUser } from "../hooks/mutations";
import { Button } from "@/components/ui/button";

export function UsersTable() {
  const { users, isFetching, fetchNextPage } = useGetUsers();

  const data = useMemo(
    () => users?.pages?.flatMap((page) => page.data) ?? [],
    [users],
  );

  const currRows = useMemo(
    () =>
      users?.pages.reduce((prev, curr) => {
        return prev + (curr?.data?.length ?? 0);
      }, 0) ?? 0,
    [users],
  );

  const totalRows = useMemo(
    () => users?.pages?.[0]?.paginate?.total ?? 0,
    [users],
  );

  const { mutate: updateUser } = useUpdateUser();

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
      {
        id: "status_udpator",
        header: "Update Status",
        cell: ({ row }) => {
          const { _id, status } = row.original;

          const handleClick = () => {
            updateUser({
              userId: _id,
              status: status === "active" ? "inactive" : "active",
            });
          };

          return (
            <Button onClick={handleClick}>
              {status === "active" ? "Make Inactive" : "Make Active"}
            </Button>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable<User>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <DataTable
        {...{ table, isFetching, fetchNextPage, currRows, totalRows }}
      />

      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={() => table.previousPage()}
              />
            </PaginationItem>

            <PaginationItem>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={() => table.nextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
