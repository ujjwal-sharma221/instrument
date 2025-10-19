import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/component/editor";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/lib/auth/auth-utils";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { EditorHeader } from "@/features/editor/component/editor-header";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { workflowId } = await params;
  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;
