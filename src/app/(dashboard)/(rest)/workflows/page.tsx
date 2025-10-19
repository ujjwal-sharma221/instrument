import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";
import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/workflows";
import { requireAuth } from "@/lib/auth/auth-utils";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { workflowParamsLoader } from "@/features/workflows/server/loader-params";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  await requireAuth();

  const params = await workflowParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
