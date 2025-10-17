import { requireAuth } from "@/lib/auth/auth-utils";

const Page = async () => {
  await requireAuth();

  return <div>Credentials Page</div>;
};

export default Page;
