"use client";

import { useRouter } from "next/navigation";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspsenseWorkflows,
} from "../hooks/use-workflows";
import { Workflow } from "@/generated/prisma";
import {
  EmptyView,
  ErrorView,
  LoadingView,
} from "@/components/entity-components/entity-state";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowParams } from "../hooks/use-workflow-paramas";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { EntityList } from "@/components/entity-components/entity-list";
import { EntityItem } from "@/components/entity-components/entity-item";
import { EntityHeader } from "@/components/entity-components/entity-header";
import { EntitySearch } from "@/components/entity-components/entity-search";
import { EntityContainer } from "@/components/entity-components/entity-container";
import { EntityPagination } from "@/components/entity-components/entity-pagination";

export function WorkflowsList() {
  const workflows = useSuspsenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
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

export function WorkflowsLoading() {
  return <LoadingView message="Loading Workflows" />;
}

export function WorkflowsError() {
  return <ErrorView message="Error loading workflows" />;
}

export function WorkflowsEmpty() {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        window.location.href = `/workflows/${data.id}`;
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EmptyView
        isPending={createWorkflow.isPending}
        onNew={handleCreate}
        message="No workflows found. Create a new workflow to get started"
      />
    </>
  );
}

export function WorkflowItem({ data }: { data: Workflow }) {
  const removeWorkflow = useRemoveWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}{" "}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
}
