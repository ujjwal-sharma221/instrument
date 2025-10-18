"use client";

import { useRouter } from "next/navigation";

import {
  useCreateWorkflow,
  useSuspsenseWorkflows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { EntityHeader } from "@/components/entity-components/entity-header";
import { EntityContainer } from "@/components/entity-components/entity-container";

export function WorkflowsList() {
  const workflows = useSuspsenseWorkflows();

  return <>{JSON.stringify(workflows.data, null, 2)}</>;
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and Manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
}

export function WorkflowsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
}
