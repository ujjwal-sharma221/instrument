"use client";

import { useRouter } from "next/navigation";

import {
  useCreateWorkflow,
  useSuspsenseWorkflows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowParams } from "../hooks/use-workflow-paramas";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { EntityHeader } from "@/components/entity-components/entity-header";
import { EntitySearch } from "@/components/entity-components/entity-search";
import { EntityContainer } from "@/components/entity-components/entity-container";
import { EntityPagination } from "@/components/entity-components/entity-pagination";

export function WorkflowsList() {
  const workflows = useSuspsenseWorkflows();

  return <>{JSON.stringify(workflows.data, null, 2)}</>;
}

export function WorkflowsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowPagination />}
    >
      {children}
    </EntityContainer>
  );
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

export function WorkflowsSearch() {
  const [params, setParams] = useWorkflowParams();
  const { searchValue, onSearchValueChange } = useDebouncedSearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onValueChange={onSearchValueChange}
      placeholder="Search workflows"
    />
  );
}

export function WorkflowPagination() {
  const workflows = useSuspsenseWorkflows();
  const [params, setParams] = useWorkflowParams();

  return (
    <EntityPagination
      disabled={workflows.isLoading}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
}
