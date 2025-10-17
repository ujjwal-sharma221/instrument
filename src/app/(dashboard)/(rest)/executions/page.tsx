import { requireAuth } from "@/lib/auth/auth-utils";

const Page = async () => {
  await requireAuth();

  return <div>Executions Page</div>;
};

export default Page;
