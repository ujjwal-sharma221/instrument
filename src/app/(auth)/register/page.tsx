import { isAuthenticated } from "@/lib/auth/auth-utils";
import { RegisterForm } from "@/features/auth/components/register-form";

const Page = async () => {
  await isAuthenticated();

  return <RegisterForm />;
};

export default Page;
