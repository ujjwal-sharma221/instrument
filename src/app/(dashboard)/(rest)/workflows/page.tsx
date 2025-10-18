import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/features/workflows/components/workflows";
import { requireAuth } from "@/lib/auth/auth-utils";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<p>Loading</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
