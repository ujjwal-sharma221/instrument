import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Button } from "../ui/button";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export function EntityHeader(props: EntityHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{props.title}</h1>
        {props.description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {props.description}
          </p>
        )}
      </div>
      {props.onNew && !props.newButtonHref && (
        <Button
          size="sm"
          onClick={props.onNew}
          disabled={props.isCreating || props.disabled}
        >
          <PlusIcon className="size-4" />
          {props.newButtonLabel}
        </Button>
      )}

      {!props.onNew && props.newButtonHref && (
        <Button size="sm" asChild>
          <Link href={props.newButtonHref}>
            <PlusIcon className="size-4" />
            {props.newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}
