import { useQuery } from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { User } from "@/types/auth";

export const useGetCurrentUser = () =>
  useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: () => auth.getCurrentUser(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: false,
  });
