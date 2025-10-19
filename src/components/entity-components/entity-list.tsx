import { cn } from "@/lib/utils";

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>(props: EntityListProps<T>) {
  if (props.items.length === 0 && props.emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{props.emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", props.className)}>
      {props.items.map((item, index) => (
        <div key={props.getKey ? props.getKey(item, index) : index}>
          {props.renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
