import { SearchIcon } from "lucide-react";

import { SearchInput } from "../search-input";

interface EntitySearchProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function EntitySearch({
  value,
  onValueChange,
  placeholder = "Search",
}: EntitySearchProps) {
  return (
    <div className="ml-auto relative">
      <SearchIcon className="size-3.5 left-3 absolute top-1/2 -translate-y-1/2 text-muted-foreground" />
      <SearchInput
        className="max-w-[200px] shadow-none border-border pl-8 text-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}
