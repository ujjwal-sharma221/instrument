interface PageProps {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { workflowId } = await params;

  return <div>Page Id : {workflowId}</div>;
};

export default Page;
