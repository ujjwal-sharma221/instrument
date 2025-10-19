type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  pagination?: React.ReactNode;
  search?: React.ReactNode;
};

export function EntityContainer({
  children,
  search,
  pagination,
  header,
}: EntityContainerProps) {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
          {pagination}
        </div>
      </div>
    </div>
  );
}
