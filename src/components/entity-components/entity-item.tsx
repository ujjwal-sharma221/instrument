import Link from "next/link";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface EntityItemProps {
  href: string;
  title: string;
  subtitle: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export function EntityItem(props: EntityItemProps) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.isRemoving) return;

    if (props.onRemove) {
      await props.onRemove();
    }
  };

  return (
    <Link href={props.href} prefetch>
      <Item
        variant="outline"
        className={cn(
          "hover:bg-muted cursor-pointer rounded-xl",
          props.isRemoving && "opacity-50 animate-pulse cursor-not-allowed",
          props.className,
        )}
      >
        {props.image && <ItemMedia>{props.image}</ItemMedia>}
        <ItemContent>
          <ItemTitle className="text-base font-medium">{props.title}</ItemTitle>
          {!!props.subtitle && (
            <ItemDescription className="text-xs">
              {props.subtitle}
            </ItemDescription>
          )}
        </ItemContent>

        {(props.actions || props.onRemove) && (
          <ItemActions className="gap-x-4">
            {props.actions}
            {props.onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DropdownMenuItem
                    onClick={handleRemove}
                    disabled={props.isRemoving}
                  >
                    <Trash2Icon className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </ItemActions>
        )}
      </Item>
    </Link>
  );
}
