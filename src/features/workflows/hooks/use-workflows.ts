import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

export const useSuspsenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.createOne.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created successfully`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );
};
