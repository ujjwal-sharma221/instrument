interface PageProps {
  params: Promise<{ execId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { execId } = await params;

  return <div>Page Id : {execId}</div>;
};

export default Page;
