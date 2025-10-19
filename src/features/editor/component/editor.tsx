"use client";

import {
  ErrorView,
  LoadingView,
} from "@/components/entity-components/entity-state";
import { useSuspsenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export function Editor({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useSuspsenseWorkflow(workflowId);

  return <div>{JSON.stringify(workflow, null, 2)}</div>;
}

export const EditorLoading = () => {
  return <LoadingView message="Loading editor" />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};
