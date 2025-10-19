import { AlertTriangleIcon, CookingPotIcon } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";
import { Button } from "../ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

interface StateViewProps {
  message?: string;
}

export function LoadingView({ message }: StateViewProps) {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        {!!message && (
          <ItemContent>
            <ItemTitle>{message}</ItemTitle>
          </ItemContent>
        )}
      </Item>
    </div>
  );
}

export function ErrorView({ message }: StateViewProps) {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Item variant="outline" className="bg-red-100">
        <ItemMedia>
          <AlertTriangleIcon className="size-4" />
        </ItemMedia>
        {!!message && (
          <ItemContent className="">
            <ItemTitle>{message}</ItemTitle>
          </ItemContent>
        )}
      </Item>
    </div>
  );
}

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
  isPending?: boolean;
}

export function EmptyView({ onNew, message, isPending }: EmptyViewProps) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CookingPotIcon />
        </EmptyMedia>
        <EmptyTitle>No Items</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button
            variant="default"
            size="sm"
            onClick={onNew}
            disabled={isPending}
          >
            Add Item
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
