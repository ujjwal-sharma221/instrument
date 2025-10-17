"use client";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth/auth-utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  // await requireAuth();
  //
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        alert("Successfully created");
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      home
      <Button onClick={() => create.mutate()}>Create workflow</Button>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
