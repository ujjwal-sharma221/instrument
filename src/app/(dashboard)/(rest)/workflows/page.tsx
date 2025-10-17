import { requireAuth } from "@/lib/auth/auth-utils";

const Page = async () => {
  await requireAuth();

  return <div>Workflow Page</div>;
};

export default Page;
