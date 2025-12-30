import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { USERS } from "../api";

function getUsersOpts() {
  return infiniteQueryOptions({
    queryKey: ["USERS"] as const,
    queryFn: () => USERS.ALL(),
    initialPageParam: { page: 1, limit: 10 },
    getNextPageParam: (_lastPage, allPages, lastPageParam, _allPagesParams) => {
      const { hasMore, nextPage } = _lastPage.paginate;

      return hasMore
        ? {
            limit: lastPageParam.limit,
            page: nextPage,
          }
        : undefined;
    },
  });
}

export const useGetUsers = () => {
  const opts = getUsersOpts();
  const { data, ...rest } = useSuspenseInfiniteQuery(opts);

  return {
    users: data,
    ...rest,
  };
};
