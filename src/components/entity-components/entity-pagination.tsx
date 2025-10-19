import { Button } from "../ui/button";
import { ChevronLeftIcon } from "../icons/chevron-left";
import { ChevronRightIcon } from "../icons/chevron-right";

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function EntityPagination(props: EntityPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {props.page} of {props.totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={props.page === 1 || props.disabled}
          variant="outline"
          size="icon"
          onClick={() => props.onPageChange(Math.max(1, props.page - 1))}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          disabled={
            props.page === props.totalPages ||
            props.totalPages === 0 ||
            props.disabled
          }
          variant="outline"
          size="icon"
          onClick={() =>
            props.onPageChange(Math.min(props.totalPages, props.page + 1))
          }
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
