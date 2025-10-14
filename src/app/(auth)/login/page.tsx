import { isAuthenticated } from "@/lib/auth/auth-utils";
import { LoginForm } from "@/features/auth/components/login-form";

const Page = async () => {
  await isAuthenticated();

  return <LoginForm />;
};

export default Page;
