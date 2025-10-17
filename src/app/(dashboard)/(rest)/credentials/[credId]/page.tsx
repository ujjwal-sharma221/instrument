interface PageProps {
  params: Promise<{ credId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { credId } = await params;

  return <div>Page Id : {credId}</div>;
};

export default Page;
